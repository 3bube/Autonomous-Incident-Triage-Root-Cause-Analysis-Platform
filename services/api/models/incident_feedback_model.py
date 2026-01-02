from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum, DateTime
from core.database import Base
from enum import Enum
from datetime import datetime, timezone

class FeedbackType(str, Enum):
    CORRECT = "correct"
    INCORRECT = "incorrect"
    PARTIAL = "partial"



class IncidentFeedbackModel(Base):
    __tablename__ = "incident_feedback"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    hypothesis_id = Column(Integer, ForeignKey("root_cause_hypotheses.id"), nullable=True)
    feedback_type = Column(SQLEnum(FeedbackType), nullable=False)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)