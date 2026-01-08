"""Create test service and organization for seeding fixtures."""
import sys
sys.path.insert(0, 'services/api')

from dotenv import load_dotenv
from pathlib import Path
load_dotenv(Path('services/api/.env'))

from sqlalchemy import text
from core.database import SessionLocal

db = SessionLocal()

try:
    # First, ensure we have an organization
    result = db.execute(text("SELECT id FROM organizations LIMIT 1")).first()
    org_id = result[0] if result else None
    
    if not org_id:
        # Create an organization
        db.execute(text("""
            INSERT INTO organizations (name, created_at, updated_at)
            VALUES ('Default Organization', NOW(), NOW())
        """))
        db.commit()
        result = db.execute(text("SELECT id FROM organizations ORDER BY id DESC LIMIT 1")).first()
        org_id = result[0]
        print(f"✅ Created organization with ID: {org_id}")
    else:
        print(f"✅ Using existing organization with ID: {org_id}")
    
    # Create a test service
    result = db.execute(text(f"""
        INSERT INTO services (organization_id, name, description, tier, owner_team, health_status, created_at, updated_at)
        VALUES ({org_id}, 'Test Service', 'Service for telemetry testing', 'non_critical', 'Platform', 'unknown', NOW(), NOW())
        RETURNING id
    """)).first()
    
    service_id = result[0]
    db.commit()
    print(f"✅ Created service with ID: {service_id}")
    print(f"   Organization: {org_id}")
    print(f"   Name: Test Service")
    print(f"   Health Status: unknown")
    
except Exception as e:
    db.rollback()
    print(f"❌ Error: {e}")
finally:
    db.close()
