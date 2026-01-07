from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class IntegrationStatusEnum(str, Enum):
    CONNECTED = "connected"
    DISCONNECTED = "disconnected"
    SYNCED = "synced"
    ERROR = "error"


class IntegrationTypeEnum(str, Enum):
    PROMETHEUS = "prometheus"
    OPENTELEMETRY = "opentelemetry"
    DATADOG = "datadog"
    GITHUB = "github"
    SLACK = "slack"
    ELASTICSEARCH = "elasticsearch"
    PAGERDUTY = "pagerduty"


class IntegrationItemSchema(BaseModel):
    id: str
    type: IntegrationTypeEnum
    title: str
    description: str
    status: IntegrationStatusEnum
    last_sync: Optional[str] = None
    
    class Config:
        from_attributes = True


class IntegrationCategorySchema(BaseModel):
    category: str
    items: List[IntegrationItemSchema]


class IntegrationsResponseSchema(BaseModel):
    integrations: List[IntegrationCategorySchema]


class IntegrationCreateSchema(BaseModel):
    type: IntegrationTypeEnum
    config: dict  # Configuration specific to each integration


class IntegrationUpdateSchema(BaseModel):
    config: Optional[dict] = None
    status: Optional[IntegrationStatusEnum] = None
