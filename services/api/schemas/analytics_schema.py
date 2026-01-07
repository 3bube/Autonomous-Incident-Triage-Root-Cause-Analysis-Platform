from pydantic import BaseModel
from typing import List, Optional


# Analytics Stats
class AnalyticsStatsSchema(BaseModel):
    mttr: str  # Mean Time to Resolve
    mttd: str  # Mean Time to Detect
    noise_reduction: str  # percentage
    error_budget: str  # percentage
    mttr_trend: str
    mttd_trend: str
    noise_reduction_trend: str
    error_budget_trend: str


# Incident Volume Data Point
class IncidentVolumeDataPointSchema(BaseModel):
    time: str
    incidents: int
    is_deployment: bool
    annotation: Optional[str] = None


class IncidentVolumeResponseSchema(BaseModel):
    data: List[IncidentVolumeDataPointSchema]


# Service Health
class ServiceHealthItemSchema(BaseModel):
    id: int
    status: str  # healthy, degraded, critical


class ServiceHealthResponseSchema(BaseModel):
    services: List[ServiceHealthItemSchema]
    healthy_count: int
    degraded_count: int
    critical_count: int


# Root Cause Stats
class RootCauseStatItemSchema(BaseModel):
    name: str
    value: int  # percentage
    color: str


class RootCauseStatsResponseSchema(BaseModel):
    stats: List[RootCauseStatItemSchema]


# Alert Funnel
class AlertFunnelSchema(BaseModel):
    raw_alerts: int
    correlated_groups: int
    incidents: int
    efficiency: float  # percentage


# Team Load
class TeamLoadItemSchema(BaseModel):
    team: str
    load: int  # percentage
    status: str  # healthy, critical


class TeamLoadResponseSchema(BaseModel):
    teams: List[TeamLoadItemSchema]


# Combined Analytics Response
class AnalyticsResponseSchema(BaseModel):
    stats: AnalyticsStatsSchema
    incident_volume: List[IncidentVolumeDataPointSchema]
    service_health: ServiceHealthResponseSchema
    root_cause_stats: List[RootCauseStatItemSchema]
    alert_funnel: AlertFunnelSchema
    team_load: List[TeamLoadItemSchema]
