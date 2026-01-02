from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from core.database import Base
from datetime import datetime, timezone

class ModelTrainingLabelsModel(Base):
    __tablename__ = "model_training_labels"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    root_cause_entity_type = Column(String, nullable=False)
    root_cause_entity_id = Column(Integer, nullable=False)
    label_confidence = Column(Float, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)