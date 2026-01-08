"""Create incident record."""
import sys
sys.path.insert(0, 'services/api')

from dotenv import load_dotenv
from pathlib import Path
load_dotenv(Path('services/api/.env'))

from sqlalchemy import text
from core.database import SessionLocal

db = SessionLocal()

try:
    # Get organization and service
    org_result = db.execute(text("SELECT id FROM organizations LIMIT 1")).first()
    org_id = org_result[0] if org_result else 7
    
    service_result = db.execute(text("SELECT id FROM services LIMIT 1")).first()
    service_id = service_result[0] if service_result else 2
    
    # Create incident
    result = db.execute(text(f"""
        INSERT INTO incidents (organization_id, primary_service_id, title, severity, status, created_at, updated_at)
        VALUES ({org_id}, {service_id}, 'Test Incident from Fixtures', 'medium', 'open', NOW(), NOW())
        RETURNING id
    """)).first()
    
    incident_id = result[0]
    db.commit()
    print(f"✅ Created incident with ID: {incident_id}")
    print(f"   Organization: {org_id}")
    print(f"   Service: {service_id}")
    print(f"   Title: Test Incident from Fixtures")
    
except Exception as e:
    db.rollback()
    print(f"❌ Error: {e}")
finally:
    db.close()
