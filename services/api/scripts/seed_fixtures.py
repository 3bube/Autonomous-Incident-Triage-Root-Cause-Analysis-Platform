import json
import sys
import os
from pathlib import Path

# Add parent directory to Python path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

# Load environment variables from .env file
from dotenv import load_dotenv
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)


def list_fixtures():
    """List all generated fixtures."""
    fixtures_path = Path(__file__).parent.parent.parent / "telemetry-simulation" / "output" / "fixtures"
    
    if not fixtures_path.exists():
        print(f"❌ Fixtures path not found: {fixtures_path}")
        return
    
    print("📂 Generated fixtures:")
    print()
    
    # Group by scenario type
    scenarios = {}
    for ndjson_file in fixtures_path.rglob("*.ndjson"):
        scenario_type = ndjson_file.parent.parent.name
        scenario_name = ndjson_file.parent.name
        file_type = ndjson_file.stem
        
        key = f"{scenario_type}/{scenario_name}"
        if key not in scenarios:
            scenarios[key] = {"files": {}, "total_records": 0}
        
        # Count lines (records) in the file
        try:
            with open(ndjson_file) as f:
                count = sum(1 for line in f if line.strip())
            scenarios[key]["files"][file_type] = count
            scenarios[key]["total_records"] += count
        except Exception as e:
            print(f"  ⚠️  Error reading {ndjson_file}: {e}")
    
    # Print organized output
    for scenario, data in sorted(scenarios.items()):
        print(f"  📁 {scenario}")
        for file_type, count in data["files"].items():
            print(f"     • {file_type}.ndjson: {count:,} records")
        print()
    
    # Summary
    total_scenarios = len(scenarios)
    total_files = sum(len(s["files"]) for s in scenarios.values())
    total_records = sum(s["total_records"] for s in scenarios.values())
    
    print(f"✅ Summary:")
    print(f"   • Total scenarios: {total_scenarios}")
    print(f"   • Total files: {total_files}")
    print(f"   • Total records: {total_records:,}")
    print()
    print(f"   Fixtures ready for integration or manual database seeding!")


def seed_to_db():
    """Seed fixtures from NDJSON files to database."""
    fixtures_path = Path(__file__).parent.parent.parent / "telemetry-simulation" / "output" / "fixtures"
    
    if not fixtures_path.exists():
        print(f"❌ Fixtures path not found: {fixtures_path}")
        return
    
    print("Attempting to seed to database...")
    print()
    
    try:
        from core.database import SessionLocal
        from models.incident_log_model import IncidentLogModel
        from models.incidents_model import IncidentModel
        from models.services_model import ServiceModel
        from models.organization_model import OrganizationModel
        from models.user_model import UserModel
        from core.security import hash_password
        
        db = SessionLocal()
        
        # Ensure we have a user (required for organization owner_id)
        user = db.query(UserModel).first()
        if not user:
            user = UserModel(
                email="test@example.com",
                full_name="Test User",
                password=hash_password("testpass123")
            )
            db.add(user)
            db.flush()
        
        # Ensure we have an organization
        org = db.query(OrganizationModel).first()
        if not org:
            org = OrganizationModel(name="Test Organization", owner_id=user.id)
            db.add(org)
            db.flush()
        
        # Get or create a test incident
        incident = db.query(IncidentModel).first()
        if not incident:
            # Get first service
            service = db.query(ServiceModel).first()
            if not service:
                print("⚠️  No services available. Create one first with: python create_service2.py")
                db.close()
                return
            
            incident = IncidentModel(
                organization_id=org.id,
                primary_service_id=service.id,
                title="Test Incident from Fixtures",
                severity="medium",
                status="open"
            )
            db.add(incident)
            db.flush()
        
        # Get a service for the logs
        service = db.query(ServiceModel).first()
        service_id = service.id if service else None
        
        # Load logs from all fixture directories
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
                            # Create incident log entry
                            log = IncidentLogModel(
                                incident_id=incident.id,
                                service_id=service_id,
                                timestamp=data.get("timestamp"),
                                source=data.get("service", "unknown"),
                                level=data.get("level", "INFO"),
                                message=data.get("message", "")
                            )
                            db.add(log)
                            count += 1
                    print(f"    ✓ Added {count} log entries")
                    total_loaded += count
            
            db.commit()
            print()
            print(f"✅ Successfully seeded {total_loaded} log entries to incident #{incident.id}")
        else:
            print("⚠️  No log files found")
            
    except Exception as e:
        try:
            db.rollback()
        except:
            pass
        print(f"❌ Database seeding failed: {e}")
        print()
        print("💡 Troubleshooting:")
        print("   1. Ensure create_service.py has been run")
        print("   2. Check .env file has valid DATABASE_URL")
        print("   3. Check alembic migrations are up to date")
    finally:
        try:
            db.close()
        except:
            pass

if __name__ == "__main__":
    print("🎯 Telemetry Fixture Seeding Script")
    print("=" * 50)
    print()
    
    # First, list available fixtures
    list_fixtures()
    
    # Then, attempt to seed to database
    print("Attempting to seed to database...")
    print()
    seed_to_db()