from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from core.database import Base
from datetime import datetime, timezone


class NotificationChannelModel(Base):
    """
    Stores notification channel configurations (Slack, Email, PagerDuty, etc.)
    """
    __tablename__ = "notification_channels"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    channel_type = Column(String, nullable=False)  # slack, email, pagerduty, webhook
    configuration = Column(String, nullable=False)  # JSON string with channel-specific config
    is_active = Column(Integer, default=1, nullable=False)  # 1 = active, 0 = inactive
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)


class AlertRuleNotificationModel(Base):
    """
    Many-to-many relationship between alert rules and notification channels
    """
    __tablename__ = "alert_rule_notifications"

    id = Column(Integer, primary_key=True, index=True)
    alert_rule_id = Column(Integer, ForeignKey("alert_rules.id"), nullable=False)
    notification_channel_id = Column(Integer, ForeignKey("notification_channels.id"), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
