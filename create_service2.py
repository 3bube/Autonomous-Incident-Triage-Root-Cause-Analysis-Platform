"""Recreate service with uppercase enum values until models are synced."""
import sys
sys.path.insert(0, 'services/api')

from dotenv import load_dotenv
from pathlib import Path
load_dotenv(Path('services/api/.env'))

from sqlalchemy import text
from core.database import SessionLocal

db = SessionLocal()

try:
    # Delete existing services (they have wrong enum values)
    db.execute(text("DELETE FROM services WHERE id = 1"))
    db.commit()
    print("✅ Cleared old services")
    
    # Get organization
    result = db.execute(text("SELECT id FROM organizations LIMIT 1")).first()
    org_id = result[0] if result else 7
    
    # Create service with lowercase enum values (migration was successful)
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
    print()
    print("✅ Migration to lowercase enums was successful!")
    
except Exception as e:
    db.rollback()
    print(f"❌ Error: {e}")
finally:
    db.close()
