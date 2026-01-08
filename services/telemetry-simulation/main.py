#!/usr/bin/env python3
"""Telemetry simulation CLI for generating test incident data."""

import click
import json
import os
from pathlib import Path
from datetime import datetime, timedelta

from generators.metrics_generator import MetricsGenerator
from generators.logs_generator import LogsGenerator
from generators.traces_generator import TracesGenerator
from generators.events_generator import EventsGenerator
from scenarios.normal_operations import generate_normal_telemetry
from scenarios.incident_scenarios import (
    generate_service_degradation,
    generate_database_outage,
    generate_cascade_failure,
    generate_deployment_failure
)
from scenarios.noise_scenarios import (
    generate_transient_spikes,
    generate_high_volume_noise,
    generate_intermittent_errors
)


# Base output directory
OUTPUT_DIR = Path("output/fixtures")


def _ensure_output_dir(scenario_type: str, scenario_name: str = None) -> Path:
    """Create output directory structure."""
    if scenario_name:
        path = OUTPUT_DIR / scenario_type / scenario_name
    else:
        path = OUTPUT_DIR / scenario_type
    path.mkdir(parents=True, exist_ok=True)
    return path


def _save_ndjson(data: list, filepath: Path):
    """Save data as newline-delimited JSON."""
    with open(filepath, 'w') as f:
        for item in data:
            f.write(json.dumps(item) + '\n')


@click.group()
def cli():
    """Telemetry Simulation CLI - Generate test incident data."""
    pass


@cli.command()
@click.option('--duration', default=300, help='Duration in seconds')
@click.option('--interval', default=10, help='Sampling interval in seconds')
def normal(duration, interval):
    """Generate normal operation telemetry."""
    click.echo(f"Generating normal operation telemetry ({duration}s)...")
    output_path = _ensure_output_dir("normal")
    
    metrics, logs, traces, events = generate_normal_telemetry(duration, interval)
    
    _save_ndjson(metrics, output_path / "metrics.ndjson")
    _save_ndjson(logs, output_path / "logs.ndjson")
    _save_ndjson(traces, output_path / "traces.ndjson")
    _save_ndjson(events, output_path / "events.ndjson")
    
    click.echo(f"✓ Saved to {output_path}")
    click.echo(f"  - {len(metrics)} metrics")
    click.echo(f"  - {len(logs)} logs")
    click.echo(f"  - {len(traces)} traces")
    click.echo(f"  - {len(events)} events")


@cli.command()
@click.option('--incident-duration', default=60, help='Incident duration in seconds')
@click.option('--pre-incident', default=120, help='Pre-incident baseline duration')
@click.option('--post-incident', default=120, help='Post-incident recovery duration')
@click.option('--interval', default=10, help='Sampling interval in seconds')
def degradation(incident_duration, pre_incident, post_incident, interval):
    """Generate service degradation incident."""
    click.echo("Generating service degradation incident...")
    output_path = _ensure_output_dir("incidents", "degradation")
    
    metrics, logs, traces, events = generate_service_degradation(
        incident_duration, pre_incident, post_incident, interval
    )
    
    _save_ndjson(metrics, output_path / "metrics.ndjson")
    _save_ndjson(logs, output_path / "logs.ndjson")
    _save_ndjson(traces, output_path / "traces.ndjson")
    _save_ndjson(events, output_path / "events.ndjson")
    
    click.echo(f"✓ Saved to {output_path}")
    click.echo(f"  - {len(metrics)} metrics")
    click.echo(f"  - {len(logs)} logs")
    click.echo(f"  - {len(traces)} traces")
    click.echo(f"  - {len(events)} events")


@cli.command()
@click.option('--incident-duration', default=60, help='Incident duration in seconds')
@click.option('--pre-incident', default=120, help='Pre-incident baseline duration')
@click.option('--post-incident', default=120, help='Post-incident recovery duration')
@click.option('--interval', default=10, help='Sampling interval in seconds')
def outage(incident_duration, pre_incident, post_incident, interval):
    """Generate database outage incident."""
    click.echo("Generating database outage incident...")
    output_path = _ensure_output_dir("incidents", "outage")
    
    metrics, logs, traces, events = generate_database_outage(
        incident_duration, pre_incident, post_incident, interval
    )
    
    _save_ndjson(metrics, output_path / "metrics.ndjson")
    _save_ndjson(logs, output_path / "logs.ndjson")
    _save_ndjson(traces, output_path / "traces.ndjson")
    _save_ndjson(events, output_path / "events.ndjson")
    
    click.echo(f"✓ Saved to {output_path}")
    click.echo(f"  - {len(metrics)} metrics")
    click.echo(f"  - {len(logs)} logs")
    click.echo(f"  - {len(traces)} traces")
    click.echo(f"  - {len(events)} events")


@cli.command()
@click.option('--incident-duration', default=90, help='Incident duration in seconds')
@click.option('--pre-incident', default=120, help='Pre-incident baseline duration')
@click.option('--post-incident', default=180, help='Post-incident recovery duration')
@click.option('--interval', default=10, help='Sampling interval in seconds')
def cascade(incident_duration, pre_incident, post_incident, interval):
    """Generate cascade failure incident."""
    click.echo("Generating cascade failure incident...")
    output_path = _ensure_output_dir("incidents", "cascade")
    
    metrics, logs, traces, events = generate_cascade_failure(
        incident_duration, pre_incident, post_incident, interval
    )
    
    _save_ndjson(metrics, output_path / "metrics.ndjson")
    _save_ndjson(logs, output_path / "logs.ndjson")
    _save_ndjson(traces, output_path / "traces.ndjson")
    _save_ndjson(events, output_path / "events.ndjson")
    
    click.echo(f"✓ Saved to {output_path}")
    click.echo(f"  - {len(metrics)} metrics")
    click.echo(f"  - {len(logs)} logs")
    click.echo(f"  - {len(traces)} traces")
    click.echo(f"  - {len(events)} events")


@cli.command()
@click.option('--incident-duration', default=60, help='Incident duration in seconds')
@click.option('--pre-incident', default=120, help='Pre-incident baseline duration')
@click.option('--post-incident', default=120, help='Post-incident recovery duration')
@click.option('--interval', default=10, help='Sampling interval in seconds')
def deployment(incident_duration, pre_incident, post_incident, interval):
    """Generate deployment failure incident."""
    click.echo("Generating deployment failure incident...")
    output_path = _ensure_output_dir("incidents", "deployment")
    
    metrics, logs, traces, events = generate_deployment_failure(
        incident_duration, pre_incident, post_incident, interval
    )
    
    _save_ndjson(metrics, output_path / "metrics.ndjson")
    _save_ndjson(logs, output_path / "logs.ndjson")
    _save_ndjson(traces, output_path / "traces.ndjson")
    _save_ndjson(events, output_path / "events.ndjson")
    
    click.echo(f"✓ Saved to {output_path}")
    click.echo(f"  - {len(metrics)} metrics")
    click.echo(f"  - {len(logs)} logs")
    click.echo(f"  - {len(traces)} traces")
    click.echo(f"  - {len(events)} events")


@cli.command()
@click.option('--noise-type', type=click.Choice(['transient', 'high-volume', 'intermittent']), 
              required=True, help='Type of noise to generate')
@click.option('--duration', default=300, help='Duration in seconds')
@click.option('--interval', default=10, help='Sampling interval in seconds')
def noise(noise_type, duration, interval):
    """Generate noise scenarios for testing alert suppression."""
    click.echo(f"Generating {noise_type} noise scenario...")
    
    if noise_type == 'transient':
        output_path = _ensure_output_dir("noise", "transient")
        metrics, logs, traces, events = generate_transient_spikes(duration, interval)
    elif noise_type == 'high-volume':
        output_path = _ensure_output_dir("noise", "high_volume")
        metrics, logs, traces, events = generate_high_volume_noise(duration, interval)
    else:  # intermittent
        output_path = _ensure_output_dir("noise", "intermittent")
        metrics, logs, traces, events = generate_intermittent_errors(duration, interval)
    
    _save_ndjson(metrics, output_path / "metrics.ndjson")
    _save_ndjson(logs, output_path / "logs.ndjson")
    _save_ndjson(traces, output_path / "traces.ndjson")
    _save_ndjson(events, output_path / "events.ndjson")
    
    click.echo(f"✓ Saved to {output_path}")
    click.echo(f"  - {len(metrics)} metrics")
    click.echo(f"  - {len(logs)} logs")
    click.echo(f"  - {len(traces)} traces")
    click.echo(f"  - {len(events)} events")


@cli.command()
def list_fixtures():
    """List all generated fixtures."""
    if not OUTPUT_DIR.exists():
        click.echo("No fixtures generated yet.")
        return
    
    click.echo("Generated fixtures:")
    for item in OUTPUT_DIR.rglob("*.ndjson"):
        size_mb = item.stat().st_size / (1024 * 1024)
        click.echo(f"  - {item.relative_to(OUTPUT_DIR)} ({size_mb:.2f} MB)")


if __name__ == '__main__':
    cli()
