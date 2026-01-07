from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class SeverityEnum(str, Enum):
    P0_CRITICAL = "P0 - Critical"
    P1_CRITICAL = "P1 - Critical"
    P2_HIGH = "P2 - High"
    P3_MEDIUM = "P3 - Medium"
    P4_LOW = "P4 - Low"


class IncidentStatusEnum(str, Enum):
    OPEN = "open"
    INVESTIGATING = "investigating"
    MITIGATED = "mitigated"
    RESOLVED = "resolved"


class NodeStatusEnum(str, Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    CRITICAL = "critical"


class TimelineEventTypeEnum(str, Enum):
    NORMAL = "normal"
    WARNING = "warning"
    CRITICAL = "critical"


# Incident Detail Stats Schema
class IncidentStatsSchema(BaseModel):
    severity: str
    elapsed_time: str
    affected_users: str
    affected_users_rate: Optional[str] = None
    ai_confidence: int  # percentage


# Root Cause Hypothesis Schema
class RootCauseReasonSchema(BaseModel):
    text: str
    highlight: Optional[str] = None


class RootCauseHypothesisSchema(BaseModel):
    title: str
    description: str
    confidence: int  # 0-100
    reasons: List[RootCauseReasonSchema]


# Timeline Data Schema
class TimelineDataPointSchema(BaseModel):
    time: str
    value: int
    status: str  # normal, warning, critical
    event: Optional[str] = None
    annotation: Optional[str] = None


# Blast Radius / Service Topology
class ServiceNodeSchema(BaseModel):
    id: str
    label: str
    icon: str
    status: NodeStatusEnum
    x: float  # percentage position
    y: float  # percentage position


class ServiceEdgeSchema(BaseModel):
    source: str
    target: str
    status: NodeStatusEnum


class BlastRadiusSchema(BaseModel):
    nodes: List[ServiceNodeSchema]
    edges: List[ServiceEdgeSchema]


# RCA Evidence
class EvidenceItemSchema(BaseModel):
    label: str
    value: str


class RCATimelineEventSchema(BaseModel):
    time: str
    event: str
    type: str  # info, warning, error


class IncidentRCASchema(BaseModel):
    summary: str
    root_cause: str
    confidence: int
    affected_services: List[str]
    evidence: List[EvidenceItemSchema]
    timeline: List[RCATimelineEventSchema]


# Live Logs
class LiveLogSchema(BaseModel):
    timestamp: str
    level: str  # ERROR, WARN, INFO, DEBUG
    message: str
    service: Optional[str] = None


# Incident List/Detail Response
class IncidentResponseSchema(BaseModel):
    id: int
    title: str
    severity: SeverityEnum
    status: IncidentStatusEnum
    start_time: datetime
    end_time: Optional[datetime] = None
    affected_users: Optional[int] = None
    primary_service: str
    ai_confidence: Optional[int] = None
    
    class Config:
        from_attributes = True


class IncidentDetailResponseSchema(IncidentResponseSchema):
    stats: IncidentStatsSchema
    root_cause_hypothesis: RootCauseHypothesisSchema
    timeline: List[TimelineDataPointSchema]
    blast_radius: BlastRadiusSchema
    rca_data: IncidentRCASchema
    live_logs: List[LiveLogSchema]
    
    class Config:
        from_attributes = True


# Incident Creation
class IncidentCreateSchema(BaseModel):
    title: str
    severity: SeverityEnum
    primary_service_id: int
    organization_id: int
    affected_users: Optional[int] = None


class IncidentUpdateSchema(BaseModel):
    title: Optional[str] = None
    severity: Optional[SeverityEnum] = None
    status: Optional[IncidentStatusEnum] = None
    end_time: Optional[datetime] = None
