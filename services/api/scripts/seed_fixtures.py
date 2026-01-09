"""Seed database with telemetry fixture data."""
import sys
import json
from pathlib import Path
from dotenv import load_dotenv
from datetime import datetime

# Add parent directory to path to import core module
api_dir = Path(__file__).parent.parent
sys.path.insert(0, str(api_dir))

# Load environment variables from api/.env
env_path = api_dir / '.env'
if env_path.exists():
    load_dotenv(env_path)
else:
    print(f"Warning: .env file not found at {env_path}")

from core.database import SessionLocal
from sqlalchemy import text

# Find fixtures path relative to project root
fixtures_path = Path(__file__).parent.parent.parent.parent / 'services' / 'telemetry-simulation' / 'output' / 'fixtures'


def escape_sql_string(s):
    """Escape single quotes in SQL strings."""
    if isinstance(s, str):
        return s.replace("'", "''")
    return str(s)


def seed_logs(db_session, log_file):
    """Load logs from a fixture file into the database."""
    with open(log_file) as f:
        count = 0
        for line in f:
            if line.strip():
                try:
                    data = json.loads(line)
                    service_name = escape_sql_string(data.get('service', 'unknown'))
                    level = escape_sql_string(data.get('level', 'INFO'))
                    message = escape_sql_string(data.get('message', ''))
                    trace_id = data.get('trace_id')
                    timestamp = data.get('timestamp')
                    
                    query = f"""
                        INSERT INTO logs (service_name, timestamp, level, message, trace_id, created_at)
                        VALUES ('{service_name}', '{timestamp}', '{level}', '{message}', 
                                {f"'{trace_id}'" if trace_id else 'NULL'}, NOW())
                    """
                    db_session.execute(text(query))
                    count += 1
                except Exception as e:
                    print(f"  Error processing log line: {e}")
                    continue
        
        db_session.commit()
    return count


def seed_metrics(db_session, metrics_file):
    """Load metrics from a fixture file into the database."""
    with open(metrics_file) as f:
        count = 0
        for line in f:
            if line.strip():
                try:
                    data = json.loads(line)
                    service_name = escape_sql_string(data.get('service', 'unknown'))
                    metric_name = escape_sql_string(data.get('metric', 'unknown'))
                    value = data.get('value', 0)
                    unit = data.get('unit', '')
                    timestamp = data.get('timestamp')
                    
                    query = f"""
                        INSERT INTO metrics (service_name, metric_name, value, unit, timestamp, created_at)
                        VALUES ('{service_name}', '{metric_name}', {value}, '{unit}', '{timestamp}', NOW())
                    """
                    db_session.execute(text(query))
                    count += 1
                except Exception as e:
                    print(f"  Error processing metric line: {e}")
                    continue
        
        db_session.commit()
    return count


def seed_traces(db_session, traces_file):
    """Load traces from a fixture file into the database."""
    with open(traces_file) as f:
        count = 0
        for line in f:
            if line.strip():
                try:
                    data = json.loads(line)
                    trace_id = escape_sql_string(data.get('trace_id', ''))
                    span_id = escape_sql_string(data.get('span_id', ''))
                    parent_span_id = data.get('parent_span_id')
                    service_name = escape_sql_string(data.get('service', 'unknown'))
                    operation = escape_sql_string(data.get('operation', 'unknown'))
                    duration = data.get('duration_ms', 0)
                    timestamp = data.get('timestamp')
                    status = data.get('status', 'unknown')
                    
                    query = f"""
                        INSERT INTO traces (trace_id, span_id, parent_span_id, service_name, operation, 
                                          duration, timestamp, status, created_at)
                        VALUES ('{trace_id}', '{span_id}', {f"'{parent_span_id}'" if parent_span_id else 'NULL'}, 
                                '{service_name}', '{operation}', {duration}, '{timestamp}', '{status}', NOW())
                    """
                    db_session.execute(text(query))
                    count += 1
                except Exception as e:
                    print(f"  Error processing trace line: {e}")
                    continue
        
        db_session.commit()
    return count


def seed_events(db_session, events_file):
    """Load events from a fixture file into the database."""
    with open(events_file) as f:
        count = 0
        for line in f:
            if line.strip():
                try:
                    data = json.loads(line)
                    service_name = escape_sql_string(data.get('service', 'unknown'))
                    event_type = escape_sql_string(data.get('type', 'unknown'))
                    details = escape_sql_string(data.get('details', ''))
                    severity = escape_sql_string(data.get('severity', 'info'))
                    timestamp = data.get('timestamp')
                    
                    query = f"""
                        INSERT INTO events (service_name, timestamp, type, details, severity, created_at)
                        VALUES ('{service_name}', '{timestamp}', '{event_type}', '{details}', '{severity}', NOW())
                    """
                    db_session.execute(text(query))
                    count += 1
                except Exception as e:
                    print(f"  Error processing event line: {e}")
                    continue
        
        db_session.commit()
    return count



def main():
    """Main seeding function."""
    db_session = SessionLocal()
    
    try:
        if not fixtures_path.exists():
            print(f"❌ Fixtures path not found: {fixtures_path}")
            return
        
        print(f"📂 Loading fixtures from: {fixtures_path}\n")
        
        # Track all scenarios and their file counts
        scenarios = {}
        
        # Walk through all fixture directories and seed data
        for scenario_dir in fixtures_path.iterdir():
            if scenario_dir.is_dir():
                scenario_name = scenario_dir.name
                print(f"\n🔄 Processing scenario: {scenario_name}")
                
                # Initialize scenario counter
                scenarios[scenario_name] = {'logs': 0, 'metrics': 0, 'traces': 0, 'events': 0}
                
                # Seed logs
                logs_file = scenario_dir / 'logs.ndjson'
                if logs_file.exists():
                    count = seed_logs(db_session, logs_file)
                    scenarios[scenario_name]['logs'] = count
                    print(f"  ✓ Logs: {count} records")
                
                # Seed metrics
                metrics_file = scenario_dir / 'metrics.ndjson'
                if metrics_file.exists():
                    count = seed_metrics(db_session, metrics_file)
                    scenarios[scenario_name]['metrics'] = count
                    print(f"  ✓ Metrics: {count} records")
                
                # Seed traces
                traces_file = scenario_dir / 'traces.ndjson'
                if traces_file.exists():
                    count = seed_traces(db_session, traces_file)
                    scenarios[scenario_name]['traces'] = count
                    print(f"  ✓ Traces: {count} records")
                
                # Seed events
                events_file = scenario_dir / 'events.ndjson'
                if events_file.exists():
                    count = seed_events(db_session, events_file)
                    scenarios[scenario_name]['events'] = count
                    print(f"  ✓ Events: {count} records")
        
        # Print summary
        print("\n" + "="*60)
        print("📊 SEEDING SUMMARY")
        print("="*60)
        
        total_logs = 0
        total_metrics = 0
        total_traces = 0
        total_events = 0
        
        for scenario, counts in scenarios.items():
            print(f"\n{scenario}:")
            print(f"  Logs:    {counts['logs']:4d}")
            print(f"  Metrics: {counts['metrics']:4d}")
            print(f"  Traces:  {counts['traces']:4d}")
            print(f"  Events:  {counts['events']:4d}")
            
            total_logs += counts['logs']
            total_metrics += counts['metrics']
            total_traces += counts['traces']
            total_events += counts['events']
        
        print("\n" + "-"*60)
        print(f"TOTAL:")
        print(f"  Logs:    {total_logs:4d}")
        print(f"  Metrics: {total_metrics:4d}")
        print(f"  Traces:  {total_traces:4d}")
        print(f"  Events:  {total_events:4d}")
        print(f"  GRAND TOTAL: {total_logs + total_metrics + total_traces + total_events:4d} records")
        print("="*60)
        print("✅ Seeding completed successfully!\n")
        
    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
        db_session.rollback()
        raise
    finally:
        db_session.close()


if __name__ == "__main__":
    main()