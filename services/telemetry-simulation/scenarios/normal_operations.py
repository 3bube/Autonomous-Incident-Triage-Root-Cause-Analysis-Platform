"""Normal operation scenarios."""

from datetime import datetime, timedelta
from typing import Tuple, List, Dict, Any
from generators.metrics_generator import MetricsGenerator
from generators.logs_generator import LogsGenerator
from generators.traces_generator import TracesGenerator
from generators.events_generator import EventsGenerator


def generate_normal_telemetry(duration_seconds: int = 300, 
                              interval_seconds: int = 10) -> Tuple[List, List, List, List]:
    """Generate normal operation telemetry."""
    start_time = datetime.utcnow() - timedelta(seconds=duration_seconds)
    
    metrics_gen = MetricsGenerator()
    logs_gen = LogsGenerator()
    traces_gen = TracesGenerator()
    events_gen = EventsGenerator()
    
    metrics = metrics_gen.generate(start_time, duration_seconds, interval_seconds)
    logs = logs_gen.generate(start_time, duration_seconds, interval_seconds, error_rate=0.02)
    traces = traces_gen.generate(start_time, duration_seconds, interval_seconds)
    events = events_gen.generate(start_time, duration_seconds)
    
    return metrics, logs, traces, events
