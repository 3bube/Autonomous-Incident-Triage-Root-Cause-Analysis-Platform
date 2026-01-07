from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


class ServiceTierEnum(str, Enum):
    CRITICAL = "critical"
    NON_CRITICAL = "non_critical"


class ServiceHealthEnum(str, Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    CRITICAL = "critical"
    UNKNOWN = "unknown"


class ServiceSchema(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    tier: ServiceTierEnum
    owner_team: str
    health_status: Optional[ServiceHealthEnum] = ServiceHealthEnum.UNKNOWN
    
    class Config:
        from_attributes = True


class ServiceResponseSchema(ServiceSchema):
    incident_count_24h: Optional[int] = 0
    avg_latency: Optional[float] = None
    error_rate: Optional[float] = None
    last_incident: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ServiceCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None
    tier: ServiceTierEnum
    owner_team: str
    organization_id: int


class ServiceUpdateSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    tier: Optional[ServiceTierEnum] = None
    owner_team: Optional[str] = None
    health_status: Optional[ServiceHealthEnum] = None


class ServiceDependencySchema(BaseModel):
    id: int
    source_service_id: int
    target_service_id: int
    dependency_type: str  # upstream, downstream
    
    class Config:
        from_attributes = True


class ServiceListResponseSchema(BaseModel):
    services: List[ServiceResponseSchema]
    total: int
