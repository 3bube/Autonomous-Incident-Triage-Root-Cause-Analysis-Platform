"""Noise scenario generators for testing alert suppression."""

from datetime import datetime, timedelta
from typing import Tuple, List, Dict, Any
from generators.metrics_generator import MetricsGenerator
from generators.logs_generator import LogsGenerator
from generators.traces_generator import TracesGenerator
from generators.events_generator import EventsGenerator


def generate_transient_spikes(duration_seconds: int = 300, 
                               interval_seconds: int = 10) -> Tuple[List, List, List, List]:
    """Generate transient spike noise pattern."""
    start_time = datetime.utcnow() - timedelta(seconds=duration_seconds)
    
    metrics_gen = MetricsGenerator()
    logs_gen = LogsGenerator()
    traces_gen = TracesGenerator()
    events_gen = EventsGenerator()
    
    # Mostly normal with occasional spikes
    metrics = metrics_gen.generate(start_time, duration_seconds, interval_seconds)
    logs = logs_gen.generate(start_time, duration_seconds, interval_seconds, error_rate=0.05)
    traces = traces_gen.generate(start_time, duration_seconds, interval_seconds)
    events = events_gen.generate(start_time, duration_seconds)
    
    return metrics, logs, traces, events


def generate_high_volume_noise(duration_seconds: int = 300,
                                interval_seconds: int = 10) -> Tuple[List, List, List, List]:
    """Generate high-volume noise pattern."""
    start_time = datetime.utcnow() - timedelta(seconds=duration_seconds)
    
    metrics_gen = MetricsGenerator()
    logs_gen = LogsGenerator()
    traces_gen = TracesGenerator()
    events_gen = EventsGenerator()
    
    # High volume of normal activity
    metrics = metrics_gen.generate(start_time, duration_seconds, interval_seconds)
    logs = logs_gen.generate(start_time, duration_seconds, interval_seconds, error_rate=0.01)
    traces = traces_gen.generate(start_time, duration_seconds, interval_seconds)
    events = events_gen.generate(start_time, duration_seconds)
    
    return metrics, logs, traces, events


def generate_intermittent_errors(duration_seconds: int = 300,
                                  interval_seconds: int = 10) -> Tuple[List, List, List, List]:
    """Generate intermittent errors noise pattern."""
    start_time = datetime.utcnow() - timedelta(seconds=duration_seconds)
    
    metrics_gen = MetricsGenerator()
    logs_gen = LogsGenerator()
    traces_gen = TracesGenerator()
    events_gen = EventsGenerator()
    
    # Intermittent errors in logs
    metrics = metrics_gen.generate(start_time, duration_seconds, interval_seconds)
    logs = logs_gen.generate(start_time, duration_seconds, interval_seconds, error_rate=0.15)
    traces = traces_gen.generate(start_time, duration_seconds, interval_seconds)
    events = events_gen.generate(start_time, duration_seconds)
    
    return metrics, logs, traces, events
