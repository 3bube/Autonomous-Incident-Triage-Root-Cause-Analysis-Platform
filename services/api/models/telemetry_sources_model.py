from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, DateTime
from core.database import Base
from enum import Enum
from datetime import datetime, timezone

class TypeEnum(str, Enum):
    METRICS = "metrics"
    LOGS = "logs"
    TRACES = "traces"
    CHANGES = "changes"

class TelemetrySourceModel(Base):
    __tablename__ = "telemetry_sources"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    type = Column(SQLEnum(TypeEnum), nullable=False)
    source_name = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)