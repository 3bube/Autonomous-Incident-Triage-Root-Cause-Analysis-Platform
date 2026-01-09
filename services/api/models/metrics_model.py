from sqlalchemy import Column, Integer, String, DateTime, Float, Index
from core.database import Base
from datetime import datetime, timezone


class MetricsModel(Base):
    """Time-series metrics from telemetry"""
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    service_name = Column(String, nullable=False, index=True)
    metric_name = Column(String, nullable=False, index=True)
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=True)  # e.g., "ms", "requests/s", "%"
    timestamp = Column(DateTime, nullable=False, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        Index('ix_metrics_service_timestamp', 'service_name', 'timestamp'),
        Index('ix_metrics_metric_name', 'metric_name'),
    )
