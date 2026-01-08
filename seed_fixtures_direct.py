"""Direct SQL seeding without using ORM models."""
import sys
import json
from pathlib import Path

sys.path.insert(0, 'services/api')

from dotenv import load_dotenv
load_dotenv(Path('services/api/.env'))

from sqlalchemy import text
from core.database import SessionLocal

db = SessionLocal()

try:
    fixtures_path = Path('services/telemetry-simulation/output/fixtures')
    
    # Get incident ID
    result = db.execute(text("SELECT id FROM incidents LIMIT 1")).first()
    incident_id = result[0] if result else 1
    
    # Get service ID
    result = db.execute(text("SELECT id FROM services LIMIT 1")).first()
    service_id = result[0] if result else None
    
    if not service_id:
        print("❌ No services found. Run create_service2.py first.")
        db.close()
        sys.exit(1)
    
    print(f"📂 Using incident #{incident_id} and service #{service_id}")
    print()
    
    # Load logs from all fixture directories using direct SQL
    log_files = list(fixtures_path.rglob("logs.ndjson"))
    if log_files:
        print(f"📂 Found {len(log_files)} log files to load")
        total_loaded = 0
        
        for log_file in log_files:
            print(f"  Loading: {log_file.relative_to(fixtures_path)}")
            with open(log_file) as f:
                count = 0
                for line in f:
                    if line.strip():
                        data = json.loads(line)
                        
                        # Use direct SQL to bypass ORM enum validation
                        db.execute(text(f"""
                            INSERT INTO incident_logs 
                            (incident_id, service_id, timestamp, level, message, source, created_at)
                            VALUES 
                            ({incident_id}, {service_id}, '{data.get("timestamp")}', 
                             '{data.get("level", "INFO")}', '{data.get("message", "").replace("'", "''")}',
                             '{data.get("service", "unknown")}', NOW())
                        """))
                        count += 1
                
                print(f"    ✓ Added {count} log entries")
                total_loaded += count
        
        db.commit()
        print()
        print(f"✅ Successfully seeded {total_loaded} log entries to incident #{incident_id}")
    else:
        print("⚠️  No log files found")
        
except Exception as e:
    db.rollback()
    print(f"❌ Seeding failed: {e}")
finally:
    db.close()
