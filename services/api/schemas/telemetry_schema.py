"""
Pydantic models for telemetry responses
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class LogLevelEnum(str, Enum):
    """Log levels"""
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARN = "WARN"
    ERROR = "ERROR"


class LogResponse(BaseModel):
    """Response model for log entries"""
    id: int
    service_name: str
    timestamp: datetime
    level: str
    message: str
    trace_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class LogsListResponse(BaseModel):
    """Paginated response for logs"""
    total: int
    skip: int
    limit: int
    items: List[LogResponse]


class MetricsResponse(BaseModel):
    """Response model for metrics"""
    id: int
    service_name: str
    metric_name: str
    value: float
    unit: Optional[str] = None
    timestamp: datetime
    created_at: datetime

    class Config:
        from_attributes = True


class MetricsListResponse(BaseModel):
    """Paginated response for metrics"""
    total: int
    skip: int
    limit: int
    items: List[MetricsResponse]


class TracesResponse(BaseModel):
    """Response model for distributed traces"""
    id: int
    trace_id: str
    span_id: str
    parent_span_id: Optional[str] = None
    service_name: str
    operation: str
    duration: float = Field(..., description="Duration in milliseconds")
    timestamp: datetime
    status: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class TracesListResponse(BaseModel):
    """Paginated response for traces"""
    total: int
    skip: int
    limit: int
    items: List[TracesResponse]


class EventResponse(BaseModel):
    """Response model for events"""
    id: int
    service_name: str
    timestamp: datetime
    type: str
    details: str
    severity: str
    created_at: datetime

    class Config:
        from_attributes = True


class EventsListResponse(BaseModel):
    """Paginated response for events"""
    total: int
    skip: int
    limit: int
    items: List[EventResponse]


class LogStatisticsResponse(BaseModel):
    """Response model for log statistics"""
    total_logs: int
    error_count: int
    warning_count: int
    info_count: int
    debug_count: int
    error_rate: float = Field(..., description="Error rate as percentage")


class LatencyStatisticsResponse(BaseModel):
    """Response model for latency statistics"""
    count: int
    avg_latency: float
    p50_latency: float
    p95_latency: float
    p99_latency: float
    max_latency: float
    min_latency: float


class MetricStatisticsResponse(BaseModel):
    """Response model for metric statistics"""
    count: int
    avg: float
    max: float
    min: float
    stddev: float


class EventStatisticsResponse(BaseModel):
    """Response model for event statistics"""
    total_events: int
    by_type: dict = Field(default_factory=dict)
    by_severity: dict = Field(default_factory=dict)


class ServiceListResponse(BaseModel):
    """Response model for list of services"""
    services: List[str]
    count: int
