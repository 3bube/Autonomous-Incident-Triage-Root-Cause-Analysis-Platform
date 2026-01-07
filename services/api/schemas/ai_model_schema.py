from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


class AIModelTypeEnum(str, Enum):
    ROOT_CAUSE_ANALYSIS = "root_cause_analysis"
    ANOMALY_DETECTION = "anomaly_detection"
    ALERT_CORRELATION = "alert_correlation"
    SEVERITY_PREDICTION = "severity_prediction"
    SERVICE_DEPENDENCY = "service_dependency"


class AIModelStatusEnum(str, Enum):
    ACTIVE = "active"
    TRAINING = "training"
    IDLE = "idle"
    ERROR = "error"


class AIModelStatsSchema(BaseModel):
    active_models: int
    global_accuracy: float  # percentage
    alerts_suppressed: float  # percentage
    last_retraining: str


class AIModelSchema(BaseModel):
    id: int
    name: str
    type: AIModelTypeEnum
    version: str
    accuracy: float
    status: AIModelStatusEnum
    last_trained_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class AIModelResponseSchema(AIModelSchema):
    training_samples: Optional[int] = None
    false_positive_rate: Optional[float] = None
    false_negative_rate: Optional[float] = None
    
    class Config:
        from_attributes = True


class AIModelListResponseSchema(BaseModel):
    stats: AIModelStatsSchema
    models: List[AIModelResponseSchema]


class AIModelRetrainSchema(BaseModel):
    model_id: int
    training_data_start: datetime
    training_data_end: datetime
