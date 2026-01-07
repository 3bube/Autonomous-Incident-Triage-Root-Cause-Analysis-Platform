from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# Import your app's config to get DATABASE_URL
from core.config import settings

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Override the sqlalchemy.url with your DATABASE_URL from settings
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Import Base from your database module
from core.database import Base

# Import all models so Alembic can detect them
from models.user_model import UserModel  # noqa
from models.organization_model import OrganizationModel  # noqa
from models.services_model import ServiceModel  # noqa
from models.incidents_model import IncidentModel  # noqa
from models.alert_model import AlertModel  # noqa
from models.alert_rule_model import AlertRuleModel, SuppressionPolicyModel  # noqa
from models.incident_alerts_model import IncidentAlertModel  # noqa
from models.incident_services_model import IncidentServiceModel  # noqa
from models.incident_events_model import IncidentEventModel  # noqa
from models.incident_feedback_model import IncidentFeedbackModel  # noqa
from models.root_cause_hypotheses_model import RootCauseHypothesisModel  # noqa
from models.change_events_model import ChangeEventModel  # noqa
from models.integration_model import IntegrationModel  # noqa
from models.ai_model_model import AIModelModel  # noqa
from models.team_invite_model import TeamInviteModel  # noqa
from models.service_dependency_model import ServiceDependencyModel  # noqa
from models.incident_log_model import IncidentLogModel  # noqa
from models.incident_timeline_model import IncidentTimelineModel  # noqa
from models.analytics_snapshot_model import AnalyticsSnapshotModel  # noqa
from models.notification_channel_model import NotificationChannelModel, AlertRuleNotificationModel  # noqa
from models.rca_evidence_model import RCAEvidenceModel, RCATimelineEventModel, RCAReasonModel  # noqa
from models.deployment_event_model import DeploymentEventModel  # noqa
from models.service_metric_snapshot_model import ServiceMetricSnapshotModel  # noqa

# add your model's MetaData object here
# for 'autogenerate' support
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()