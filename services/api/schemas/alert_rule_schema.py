from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


class AlertRuleStatusEnum(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PAUSED = "paused"


class SuppressionPolicySchema(BaseModel):
    id: str
    name: str
    description: str
    condition: str
    impact: str
    status: AlertRuleStatusEnum
    
    class Config:
        from_attributes = True


class AlertRuleStatsSchema(BaseModel):
    active_rules: int
    inactive_rules: int
    suppressed_24h: int
    routing_errors: int


class AlertRuleCreateSchema(BaseModel):
    name: str
    description: str
    condition: str
    organization_id: int
    severity: Optional[str] = None
    notification_channels: Optional[List[str]] = []


class AlertRuleUpdateSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    condition: Optional[str] = None
    status: Optional[AlertRuleStatusEnum] = None


class SuppressionPolicyCreateSchema(BaseModel):
    name: str
    description: str
    condition: str
    organization_id: int
    time_window: Optional[str] = None


class SuppressionPolicyResponseSchema(SuppressionPolicySchema):
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
