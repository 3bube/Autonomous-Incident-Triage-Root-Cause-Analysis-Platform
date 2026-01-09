from sqlalchemy import Column, Integer, String, DateTime, Float, Index
from core.database import Base
from datetime import datetime, timezone


class TracesModel(Base):
    """Distributed trace spans from telemetry"""
    __tablename__ = "traces"

    id = Column(Integer, primary_key=True, index=True)
    trace_id = Column(String, nullable=False, index=True)
    span_id = Column(String, nullable=False, index=True)
    parent_span_id = Column(String, nullable=True)
    service_name = Column(String, nullable=False, index=True)
    operation = Column(String, nullable=False)
    duration = Column(Float, nullable=False)  # in milliseconds
    timestamp = Column(DateTime, nullable=False, index=True)
    status = Column(String, nullable=True)  # e.g., "success", "error"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        Index('ix_traces_service_timestamp', 'service_name', 'timestamp'),
    )
