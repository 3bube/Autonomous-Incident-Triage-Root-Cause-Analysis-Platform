"""
Telemetry API routes for accessing raw telemetry data
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime

from core.database import get_db
from schemas.telemetry_schema import (
    LogsListResponse,
    MetricsListResponse,
    TracesListResponse,
    EventsListResponse,
    LogStatisticsResponse,
    LatencyStatisticsResponse,
    MetricStatisticsResponse,
    EventStatisticsResponse,
    ServiceListResponse,
)
from services.telemetry_service import TelemetryService

router = APIRouter(prefix="/api/v1/telemetry", tags=["telemetry"])


@router.get("/logs", response_model=LogsListResponse)
def get_logs(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    service_name: Optional[str] = Query(None),
    level: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get logs with optional filtering by service, level, and pagination.
    
    - **skip**: Number of records to skip (default: 0)
    - **limit**: Maximum records to return (default: 100, max: 1000)
    - **service_name**: Filter by service name (optional)
    - **level**: Filter by log level (ERROR, WARN, INFO, DEBUG)
    """
    logs, total = TelemetryService.query_logs(
        db, service_name=service_name, level=level, skip=skip, limit=limit
    )
    
    return LogsListResponse(
        data=logs,
        total=total,
        skip=skip,
        limit=limit,
    )


@router.get("/metrics", response_model=MetricsListResponse)
def get_metrics(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    service_name: Optional[str] = Query(None),
    metric_name: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get metrics with optional filtering by service and metric name.
    
    - **skip**: Number of records to skip (default: 0)
    - **limit**: Maximum records to return (default: 100, max: 1000)
    - **service_name**: Filter by service name (optional)
    - **metric_name**: Filter by metric name (optional)
    """
    metrics, total = TelemetryService.query_metrics(
        db,
        service_name=service_name,
        metric_name=metric_name,
        skip=skip,
        limit=limit,
    )
    
    return MetricsListResponse(
        data=metrics,
        total=total,
        skip=skip,
        limit=limit,
    )


@router.get("/traces", response_model=TracesListResponse)
def get_traces(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    service_name: Optional[str] = Query(None),
    trace_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get distributed traces with optional filtering.
    
    - **skip**: Number of records to skip (default: 0)
    - **limit**: Maximum records to return (default: 100, max: 1000)
    - **service_name**: Filter by service name (optional)
    - **trace_id**: Filter by trace ID (optional)
    - **status**: Filter by trace status (optional)
    """
    traces, total = TelemetryService.query_traces(
        db,
        service_name=service_name,
        trace_id=trace_id,
        status=status,
        skip=skip,
        limit=limit,
    )
    
    return TracesListResponse(
        data=traces,
        total=total,
        skip=skip,
        limit=limit,
    )


@router.get("/events", response_model=EventsListResponse)
def get_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    service_name: Optional[str] = Query(None),
    event_type: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get events with optional filtering by service, type, and severity.
    
    - **skip**: Number of records to skip (default: 0)
    - **limit**: Maximum records to return (default: 100, max: 1000)
    - **service_name**: Filter by service name (optional)
    - **event_type**: Filter by event type (optional)
    - **severity**: Filter by severity level (optional)
    """
    events, total = TelemetryService.query_events(
        db,
        service_name=service_name,
        event_type=event_type,
        severity=severity,
        skip=skip,
        limit=limit,
    )
    
    return EventsListResponse(
        data=events,
        total=total,
        skip=skip,
        limit=limit,
    )


@router.get("/logs/statistics", response_model=LogStatisticsResponse)
def get_log_statistics(
    service_name: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get statistics for logs (error rates, counts by level).
    
    - **service_name**: Filter by service name (optional)
    """
    stats = TelemetryService.get_log_statistics(db, service_name=service_name)
    
    return LogStatisticsResponse(**stats)


@router.get("/latency/statistics", response_model=LatencyStatisticsResponse)
def get_latency_statistics(
    service_name: Optional[str] = Query(None),
    operation: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get latency statistics (p50, p95, p99, avg, max).
    
    - **service_name**: Filter by service name (optional)
    - **operation**: Filter by operation name (optional)
    """
    stats = TelemetryService.get_latency_statistics(
        db, service_name=service_name, operation=operation
    )
    
    return LatencyStatisticsResponse(**stats)


@router.get("/metrics/statistics", response_model=MetricStatisticsResponse)
def get_metric_statistics(
    metric_name: str = Query(...),
    service_name: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get statistics for a specific metric (avg, max, min, stddev).
    
    - **metric_name**: Name of the metric (required)
    - **service_name**: Filter by service name (optional)
    """
    stats = TelemetryService.get_metric_statistics(
        db, metric_name=metric_name, service_name=service_name
    )
    
    return MetricStatisticsResponse(**stats)


@router.get("/events/statistics", response_model=EventStatisticsResponse)
def get_event_statistics(
    service_name: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Get event statistics (counts by type and severity).
    
    - **service_name**: Filter by service name (optional)
    """
    stats = TelemetryService.get_event_statistics(db, service_name=service_name)
    
    return EventStatisticsResponse(**stats)


@router.get("/services", response_model=ServiceListResponse)
def get_services(db: Session = Depends(get_db)):
    """
    Get list of all services with telemetry data.
    """
    services = TelemetryService.get_service_list(db)
    
    return ServiceListResponse(services=services)
