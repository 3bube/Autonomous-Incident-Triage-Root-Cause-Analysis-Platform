from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from core.database import Base
from datetime import datetime, timezone


class RCAEvidenceModel(Base):
    """
    Stores evidence items that support a root cause hypothesis
    """
    __tablename__ = "rca_evidence"

    id = Column(Integer, primary_key=True, index=True)
    hypothesis_id = Column(Integer, ForeignKey("root_cause_hypotheses.id"), nullable=False)
    label = Column(String, nullable=False)  # e.g., "Error Rate", "Avg Latency"
    value = Column(String, nullable=False)  # e.g., "+15%", "2.4s"
    sort_order = Column(Integer, default=0)  # For display ordering
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)


class RCATimelineEventModel(Base):
    """
    Timeline events associated with root cause analysis
    """
    __tablename__ = "rca_timeline_events"

    id = Column(Integer, primary_key=True, index=True)
    hypothesis_id = Column(Integer, ForeignKey("root_cause_hypotheses.id"), nullable=False)
    time = Column(String, nullable=False)  # Time in HH:MM:SS format
    event = Column(String, nullable=False)  # Event description
    event_type = Column(String, nullable=False)  # info, warning, error
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)


class RCAReasonModel(Base):
    """
    Stores individual reasons/explanations for a root cause hypothesis
    """
    __tablename__ = "rca_reasons"

    id = Column(Integer, primary_key=True, index=True)
    hypothesis_id = Column(Integer, ForeignKey("root_cause_hypotheses.id"), nullable=False)
    text = Column(String, nullable=False)
    highlighted_text = Column(String, nullable=True)  # Text to highlight within the reason
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
