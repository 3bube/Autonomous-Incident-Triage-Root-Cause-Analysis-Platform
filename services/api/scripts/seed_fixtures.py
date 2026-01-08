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
    """Show fixture summary and database seeding guidance."""
    fixtures_path = Path(__file__).parent.parent.parent / "telemetry-simulation" / "output" / "fixtures"
    
    if not fixtures_path.exists():
        print(f"❌ Fixtures path not found: {fixtures_path}")
        return
    
    try:
        # Try to import models to validate database connectivity
        from core.database import SessionLocal
        from sqlalchemy import text
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        
        print("✅ Database connection successful")
        print()
        print("📝 Next steps to seed data:")
        print("   1. Fix ServiceModel enum to use lowercase values (healthy, degraded, critical, unknown)")
        print("   2. Create a service record via SQL: INSERT INTO services (organization_id, name, description) VALUES (...)")
        print("   3. Run seed_fixtures.py again to populate logs")
        print()
        print("   Alternatively:")
        print("   1. Import NDJSON files directly in your application")
        print("   2. Process them through your API endpoints")
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print()
        print("💡 To use fixtures without database:")
        print("   1. Run: python main.py <scenario> from telemetry-simulation/")
        print("   2. Use generated NDJSON files from output/fixtures/")
        print("   3. Import fixtures in your application initialization")

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