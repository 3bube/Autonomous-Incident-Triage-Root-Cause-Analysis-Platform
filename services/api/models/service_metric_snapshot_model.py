from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from core.database import Base
from datetime import datetime, timezone


class ServiceMetricSnapshotModel(Base):
    """
    Stores periodic snapshots of service metrics for historical analysis and baseline comparison
    """
    __tablename__ = "service_metric_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False)
    
    # Performance Metrics
    avg_latency_ms = Column(Float, nullable=True)
    p95_latency_ms = Column(Float, nullable=True)
    p99_latency_ms = Column(Float, nullable=True)
    
    # Error Metrics
    error_rate = Column(Float, nullable=True)  # percentage
    error_count = Column(Integer, nullable=True)
    
    # Traffic Metrics
    request_count = Column(Integer, nullable=True)
    requests_per_second = Column(Float, nullable=True)
    
    # Resource Metrics
    cpu_usage = Column(Float, nullable=True)  # percentage
    memory_usage = Column(Float, nullable=True)  # percentage
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
