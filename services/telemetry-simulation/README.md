# Telemetry Simulation Service

CLI tool for generating synthetic telemetry data (metrics, logs, traces, events) for testing the incident triage platform.

## Features

- **Multiple telemetry types**: Metrics (time-series), Logs, Distributed Traces, Infrastructure Events
- **Scenario-based generation**: Normal operations, 4 incident patterns, 3 noise patterns
- **Realistic data**: Uses proper distributions, service dependencies, and error patterns
- **Customizable parameters**: Duration, sampling intervals, incident severity

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Generate normal operation telemetry
python main.py normal

# Generate incident scenarios
python main.py degradation
python main.py outage
python main.py cascade
python main.py deployment

# Generate noise for alert testing
python main.py noise --noise-type transient
python main.py noise --noise-type high-volume
python main.py noise --noise-type intermittent

# List generated fixtures
python main.py list-fixtures
```

## Output Format

All data is saved as **NDJSON** (newline-delimited JSON):

```
output/fixtures/
├── normal/
│   ├── metrics.ndjson
│   ├── logs.ndjson
│   ├── traces.ndjson
│   └── events.ndjson
├── incidents/
│   ├── degradation/
│   ├── outage/
│   ├── cascade/
│   └── deployment/
└── noise/
    ├── transient/
    ├── high_volume/
    └── intermittent/
```

## Data Schemas

### Metrics
```json
{
  "timestamp": "2024-01-15T10:30:00+00:00",
  "service": "api-gateway",
  "metric": "cpu_usage",
  "value": 42.5,
  "unit": "%"
}
```

### Logs
```json
{
  "timestamp": "2024-01-15T10:30:00+00:00",
  "service": "auth-service",
  "level": "ERROR",
  "message": "Connection pool exhausted",
  "trace_id": "abc123def456"
}
```

### Traces
```json
{
  "timestamp": "2024-01-15T10:30:00+00:00",
  "trace_id": "abc123def456",
  "span_id": "xyz789",
  "parent_span_id": "xyz788",
  "service": "user-service",
  "operation": "user-service.get_user",
  "duration_ms": 45,
  "status": "success"
}
```

### Events
```json
{
  "timestamp": "2024-01-15T10:30:00+00:00",
  "type": "deployment",
  "service": "api-gateway",
  "details": "Deploying new version to api-gateway",
  "severity": "info",
  "version": "2.1.0"
}
```

## Incident Scenarios

### Service Degradation
- Simulates gradually increasing latency
- High error rates in traces (slow operations)
- Increased timeouts in logs
- Duration: 60s incident (customizable)

### Database Outage
- Sudden spike in errors and connection failures
- Database-specific error messages
- High query times in metrics
- Duration: 60s incident (customizable)

### Cascade Failure
- Propagation of failures across services
- Circuit breaker patterns
- Increasing error rates
- Duration: 90s incident (customizable)

### Deployment Failure
- Health check failures
- Configuration errors
- Deployment event recorded
- Duration: 60s incident (customizable)

## Noise Patterns

### Transient Spikes
- Brief, isolated metric spikes
- Good for testing alert suppression
- Realistic false-positive scenarios

### High Volume
- Large volume of normal requests
- No actual errors, just high throughput
- Tests system scalability

### Intermittent Errors
- Random, scattered errors
- 15% error rate in logs
- Mimics flaky services

## Integration with API Service

The generated fixtures can be used by the API service in three ways:

1. **Mock Ingestion Layer**: Replace ingestion service with fixture reader
2. **Pre-population**: Load fixtures into database before tests
3. **Streaming Endpoint**: Expose fixtures via HTTP for real-time ingestion

Example usage in API:
```python
from telemetry_simulation.main import normal, outage
from pathlib import Path
import ndjson

# Generate and load data
metrics, logs, traces, events = normal()

# Save to database
for metric in metrics:
    db.metrics.insert_one(metric)
```

## Performance Notes

- Generates ~100-200 data points per second
- Memory efficient (NDJSON streaming)
- Suitable for integration testing
- Not recommended for production scale testing (use actual load test data)

## Customization

Edit scenario files to modify:
- Service names (10 available by default)
- Metric names and ranges
- Error messages and patterns
- Time durations and intervals
