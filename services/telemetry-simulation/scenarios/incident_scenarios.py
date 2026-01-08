"""Incident scenario generators."""

from datetime import datetime, timedelta
from typing import Tuple, List, Dict, Any
from generators.metrics_generator import MetricsGenerator
from generators.logs_generator import LogsGenerator
from generators.traces_generator import TracesGenerator
from generators.events_generator import EventsGenerator


def generate_service_degradation(incident_duration: int = 60, pre_incident: int = 120,
                                  post_incident: int = 120, interval: int = 10) -> Tuple[List, List, List, List]:
    """Service degradation pattern."""
    start_time = datetime.utcnow() - timedelta(seconds=pre_incident + incident_duration + post_incident)
    incident_start = start_time + timedelta(seconds=pre_incident)
    
    metrics_gen = MetricsGenerator()
    logs_gen = LogsGenerator()
    traces_gen = TracesGenerator()
    events_gen = EventsGenerator()
    
    # Pre-incident: normal
    metrics = metrics_gen.generate(start_time, pre_incident, interval)
    logs = logs_gen.generate(start_time, pre_incident, interval, error_rate=0.02)
    traces = traces_gen.generate(start_time, pre_incident, interval)
    events = events_gen.generate(start_time, pre_incident)
    
    # Incident: high latency
    incident_metrics = metrics_gen.generate_anomaly(incident_start, incident_duration, interval, severity=1.5)
    incident_logs = logs_gen.error_logs(incident_start, incident_duration, interval, error_type="timeout")
    incident_traces = traces_gen.slow_traces(incident_start, incident_duration, interval)
    
    # Post-incident: recovery
    recovery_start = incident_start + timedelta(seconds=incident_duration)
    recovery_metrics = metrics_gen.generate(recovery_start, post_incident, interval)
    recovery_logs = logs_gen.generate(recovery_start, post_incident, interval, error_rate=0.03)
    recovery_traces = traces_gen.generate(recovery_start, post_incident, interval)
    
    return (
        metrics + incident_metrics + recovery_metrics,
        logs + incident_logs + recovery_logs,
        traces + incident_traces + recovery_traces,
        events
    )


def generate_database_outage(incident_duration: int = 60, pre_incident: int = 120,
                             post_incident: int = 120, interval: int = 10) -> Tuple[List, List, List, List]:
    """Database outage pattern."""
    start_time = datetime.utcnow() - timedelta(seconds=pre_incident + incident_duration + post_incident)
    incident_start = start_time + timedelta(seconds=pre_incident)
    
    metrics_gen = MetricsGenerator()
    logs_gen = LogsGenerator()
    traces_gen = TracesGenerator()
    events_gen = EventsGenerator()
    
    # Pre-incident
    metrics = metrics_gen.generate(start_time, pre_incident, interval)
    logs = logs_gen.generate(start_time, pre_incident, interval, error_rate=0.02)
    traces = traces_gen.generate(start_time, pre_incident, interval)
    events = events_gen.generate(start_time, pre_incident)
    
    # Incident: spike in errors
    incident_metrics = metrics_gen.generate_anomaly(incident_start, incident_duration, interval, severity=2.0)
    incident_logs = logs_gen.error_logs(incident_start, incident_duration, interval, error_type="database")
    incident_traces = traces_gen.slow_traces(incident_start, incident_duration, interval)
    
    # Recovery
    recovery_start = incident_start + timedelta(seconds=incident_duration)
    recovery_metrics = metrics_gen.generate(recovery_start, post_incident, interval)
    recovery_logs = logs_gen.generate(recovery_start, post_incident, interval, error_rate=0.02)
    recovery_traces = traces_gen.generate(recovery_start, post_incident, interval)
    
    return (
        metrics + incident_metrics + recovery_metrics,
        logs + incident_logs + recovery_logs,
        traces + incident_traces + recovery_traces,
        events
    )


def generate_cascade_failure(incident_duration: int = 90, pre_incident: int = 120,
                             post_incident: int = 180, interval: int = 10) -> Tuple[List, List, List, List]:
    """Cascade failure pattern."""
    start_time = datetime.utcnow() - timedelta(seconds=pre_incident + incident_duration + post_incident)
    incident_start = start_time + timedelta(seconds=pre_incident)
    
    metrics_gen = MetricsGenerator()
    logs_gen = LogsGenerator()
    traces_gen = TracesGenerator()
    events_gen = EventsGenerator()
    
    # Pre-incident
    metrics = metrics_gen.generate(start_time, pre_incident, interval)
    logs = logs_gen.generate(start_time, pre_incident, interval, error_rate=0.02)
    traces = traces_gen.generate(start_time, pre_incident, interval)
    events = events_gen.generate(start_time, pre_incident)
    
    # Incident: severe anomaly
    incident_metrics = metrics_gen.generate_anomaly(incident_start, incident_duration, interval, severity=3.0)
    incident_logs = logs_gen.error_logs(incident_start, incident_duration, interval, error_type="cascade")
    incident_traces = traces_gen.slow_traces(incident_start, incident_duration, interval)
    
    # Extended recovery
    recovery_start = incident_start + timedelta(seconds=incident_duration)
    recovery_metrics = metrics_gen.generate(recovery_start, post_incident, interval)
    recovery_logs = logs_gen.generate(recovery_start, post_incident, interval, error_rate=0.02)
    recovery_traces = traces_gen.generate(recovery_start, post_incident, interval)
    
    return (
        metrics + incident_metrics + recovery_metrics,
        logs + incident_logs + recovery_logs,
        traces + incident_traces + recovery_traces,
        events
    )


def generate_deployment_failure(incident_duration: int = 60, pre_incident: int = 120,
                                post_incident: int = 120, interval: int = 10) -> Tuple[List, List, List, List]:
    """Deployment failure pattern."""
    start_time = datetime.utcnow() - timedelta(seconds=pre_incident + incident_duration + post_incident)
    incident_start = start_time + timedelta(seconds=pre_incident)
    
    metrics_gen = MetricsGenerator()
    logs_gen = LogsGenerator()
    traces_gen = TracesGenerator()
    events_gen = EventsGenerator()
    
    # Pre-incident
    metrics = metrics_gen.generate(start_time, pre_incident, interval)
    logs = logs_gen.generate(start_time, pre_incident, interval, error_rate=0.02)
    traces = traces_gen.generate(start_time, pre_incident, interval)
    events = events_gen.generate(start_time, pre_incident)
    
    # Add deployment event
    deployment_events = events_gen.deployment_events(incident_start)
    
    # Incident: deployment-related errors
    incident_metrics = metrics_gen.generate_anomaly(incident_start, incident_duration, interval, severity=1.8)
    incident_logs = logs_gen.error_logs(incident_start, incident_duration, interval, error_type="deployment")
    incident_traces = traces_gen.slow_traces(incident_start, incident_duration, interval)
    
    # Recovery
    recovery_start = incident_start + timedelta(seconds=incident_duration)
    recovery_metrics = metrics_gen.generate(recovery_start, post_incident, interval)
    recovery_logs = logs_gen.generate(recovery_start, post_incident, interval, error_rate=0.02)
    recovery_traces = traces_gen.generate(recovery_start, post_incident, interval)
    
    return (
        metrics + incident_metrics + recovery_metrics,
        logs + incident_logs + recovery_logs,
        traces + incident_traces + recovery_traces,
        events + deployment_events
    )
