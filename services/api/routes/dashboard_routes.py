"""
Dashboard API routes for aggregated dashboard data
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime

from core.database import get_db
from schemas.dashboard_schema import (
    DashboardOverviewResponse,
    ServiceHealthListResponse,
    ServiceHealthResponse,
    IncidentVolumeResponse,
    CriticalServicesResponse,
    CorrelationEngineResponse,
)
from services.dashboard_service import DashboardService





router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])


@router.get("/overview", response_model=DashboardOverviewResponse)
def get_dashboard_overview(
    hours: int = Query(1, ge=1, le=168),
    db: Session = Depends(get_db),
):
    """
    Get comprehensive dashboard overview with all key metrics.
    
    - **hours**: Time range in hours for analysis (default: 1, max: 168)
    """
    overview = DashboardService.get_dashboard_overview(db, hours=hours)
    
    return DashboardOverviewResponse(**overview)


@router.get("/services/health", response_model=ServiceHealthListResponse)
def get_services_health(
    hours: int = Query(1, ge=1, le=168),
    db: Session = Depends(get_db),
):
    """
    Get health status for all services.
    
    - **hours**: Time range in hours for analysis (default: 1, max: 168)
    """
    overview = DashboardService.get_dashboard_overview(db, hours=hours)
    
    service_health_responses = [
        ServiceHealthResponse(**health) for health in overview["service_health"]
    ]
    
    return ServiceHealthListResponse(data=service_health_responses)


@router.get("/services/{service_name}/health", response_model=ServiceHealthResponse)
def get_service_health(
    service_name: str,
    hours: int = Query(1, ge=1, le=168),
    db: Session = Depends(get_db),
):
    """
    Get health status for a specific service.
    
    - **service_name**: Name of the service
    - **hours**: Time range in hours for analysis (default: 1, max: 168)
    """
    health = DashboardService.calculate_service_health(db, service_name, hours=hours)
    
    return ServiceHealthResponse(**health)


@router.get("/metrics/incident-volume", response_model=IncidentVolumeResponse)
def get_incident_volume(
    service_name: Optional[str] = Query(None),
    hours: int = Query(24, ge=1, le=720),
    db: Session = Depends(get_db),
):
    """
    Get incident volume trends over time.
    
    - **service_name**: Filter by service name (optional)
    - **hours**: Time range in hours for analysis (default: 24, max: 720)
    """
    trends = DashboardService.get_incident_volume_trends(
        db, service_name=service_name, hours=hours
    )
    
    return IncidentVolumeResponse(**trends)


@router.get("/services/critical", response_model=CriticalServicesResponse)
def get_critical_services(
    hours: int = Query(1, ge=1, le=168),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
):
    """
    Get list of critical/degraded services.
    
    - **hours**: Time range in hours for analysis (default: 1, max: 168)
    - **limit**: Maximum number of services to return (default: 10, max: 50)
    """
    critical = DashboardService.get_critical_services(
        db, hours=hours, limit=limit
    )
    
    service_health_responses = [
        ServiceHealthResponse(**health) for health in critical
    ]
    
    return CriticalServicesResponse(
        services=service_health_responses,
        count=len(service_health_responses),
        timestamp=datetime.utcnow()
    )


@router.get("/correlation-engine", response_model=CorrelationEngineResponse)
def get_correlation_analysis(
    service_name: Optional[str] = Query(None),
    hours: int = Query(1, ge=1, le=168),
    db: Session = Depends(get_db),
):
    """
    Get correlation analysis for root cause investigation.
    
    Analyzes relationships between errors, events, and metrics to help
    identify root causes of incidents.
    
    - **service_name**: Filter by service name (optional)
    - **hours**: Time range in hours for analysis (default: 1, max: 168)
    """
    correlations = DashboardService.get_correlation_analysis(
        db, service_name=service_name, hours=hours
    )
    
    return CorrelationEngineResponse(**correlations)
