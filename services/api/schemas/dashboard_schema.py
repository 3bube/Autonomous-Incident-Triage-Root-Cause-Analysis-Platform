from pydantic import BaseModel
from typing import List, Optional


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
