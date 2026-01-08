import sys
import json
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from core.database import SessionLocal
from models import Incident, Metric, Log

def load_fixtures_to_db():
    """Load generated telemetry fixtures into the database."""
    fixtures_path = Path(__file__).parent.parent.parent / "telemetry-simulation" / "output" / "fixtures"
    db = SessionLocal()
    
    try:
        # Load incidents
        incidents_file = fixtures_path / "incidents" / "normal.ndjson"
        if incidents_file.exists():
            with open(incidents_file) as f:
                for line in f:
                    data = json.loads(line)
                    incident = Incident(**data)
                    db.add(incident)
        
        # Load metrics
        metrics_file = fixtures_path / "metrics" / "normal.ndjson"
        if metrics_file.exists():
            with open(metrics_file) as f:
                for line in f:
                    data = json.loads(line)
                    metric = Metric(**data)
                    db.add(metric)
        
        db.commit()
        print("✅ Mock data loaded successfully")
    except Exception as e:
        db.rollback()
        print(f"❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    load_fixtures_to_db()