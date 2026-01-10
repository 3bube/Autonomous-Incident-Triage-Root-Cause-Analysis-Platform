"""
Pydantic models for dashboard responses
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


class ServiceHealthEnum(str, Enum):
    """Service health status"""
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    CRITICAL = "critical"
    UNKNOWN = "unknown"


class ServiceHealthResponse(BaseModel):
    """Response model for service health"""
    service_id: int = Field(..., description="Service ID")
    service_name: str
    version: Optional[str] = Field(None, description="Service version")
    status: ServiceHealthEnum
    severity_score: int = Field(..., description="Severity score 1-3")
    error_rate: float = Field(..., description="Error rate as percentage")
    avg_latency: float = Field(..., description="Average latency in milliseconds")
    error_count: int
    total_logs: int


class ServiceHealthListResponse(BaseModel):
    """Response model for list of service health"""
    data: List[ServiceHealthResponse]


class IncidentVolumeDataPoint(BaseModel):
    """Single data point in incident volume time series"""
    timestamp: str = Field(..., description="ISO format timestamp")
    incident_count: int = Field(..., description="Number of incidents in this period")


class IncidentVolumeResponse(BaseModel):
    """Response model for incident volume trends"""
    service_name: str
    time_range_hours: int
    data_points: List[IncidentVolumeDataPoint]


class EventCorrelationInfo(BaseModel):
    """Information about correlated events"""
    type: str
    timestamp: str


class CorrelationDetail(BaseModel):
    """Detailed correlation information"""
    type: str
    error_count: int
    event_count: Optional[int] = None
    slow_trace_count: Optional[int] = None
    confidence: float
    events: Optional[List[EventCorrelationInfo]] = None
    avg_slow_duration: Optional[float] = None


class AIPrediction(BaseModel):
    """AI-predicted root cause"""
    root_cause: Optional[str]
    confidence: float
    reasoning: str


class CorrelationEngineResponse(BaseModel):
    """Response model for correlation analysis with AI predictions"""
    service_name: str
    time_range_hours: int
    error_logs_count: int
    events_count: int
    slow_traces_count: int
    correlations: List[CorrelationDetail] = Field(default_factory=list)
    ai_prediction: AIPrediction
    correlation_score: float


class DashboardOverviewResponse(BaseModel):
    """Response model for dashboard overview"""
    timestamp: datetime
    time_range_hours: int
    total_services: int
    healthy_services: int
    degraded_services: int
    critical_services: int
    total_logs: int
    total_events: int
    total_traces: int
    service_health: List[ServiceHealthResponse]


# Legacy schemas for backward compatibility
class TrendSchema(BaseModel):
    """Legacy trend schema"""
    timestamp: datetime
    value: float


class StatCardSchema(BaseModel):
    """Legacy stat card schema"""
    title: str
    value: str
    change: str
    is_positive: bool


class DashboardStatsSchema(BaseModel):
    """Legacy dashboard stats schema"""
    active_incidents: int
    mttr_minutes: int
    noise_reduction_percent: float
    system_health_percent: float


class RecentIncidentSchema(BaseModel):
    """Legacy recent incident schema"""
    id: int
    service_name: str
    severity: str
    status: str
    created_at: datetime


class AlertSummarySchema(BaseModel):
    """Legacy alert summary schema"""
    total_alerts: int
    critical_alerts: int
    warning_alerts: int
    info_alerts: int


class DashboardResponseSchema(BaseModel):
    """Legacy dashboard response schema"""
    stats: DashboardStatsSchema
    trends: List[TrendSchema]
    recent_incidents: List[RecentIncidentSchema]
    alert_summary: AlertSummarySchema
    error: Optional[str] = None


class CriticalServicesResponse(BaseModel):
    """Response model for critical services list"""
    services: List[ServiceHealthResponse]
    count: int
    timestamp: datetime


# Legacy schemas for compatibility
class TrendSchema(BaseModel):
    value: str
    is_positive: bool


class StatCardSchema(BaseModel):
    label: str
    value: str
    trend: Optional[TrendSchema] = None
    meta: Optional[str] = None


class DashboardStatsSchema(BaseModel):
    active_incidents: StatCardSchema
    mttr: StatCardSchema
    noise_reduction: StatCardSchema
    system_health: StatCardSchema


class RecentIncidentSchema(BaseModel):
    id: int
    title: str
    severity: str
    status: str
    elapsed_time: str
    affected_service: str


class AlertSummarySchema(BaseModel):
    total_alerts_24h: int
    critical_alerts: int
    suppressed_alerts: int
    correlation_rate: float  # percentage


class DashboardResponseSchema(BaseModel):
    stats: DashboardStatsSchema
    recent_incidents: List[RecentIncidentSchema]
    alert_summary: AlertSummarySchema
