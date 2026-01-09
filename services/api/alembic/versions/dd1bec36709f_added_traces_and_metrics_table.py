"""added traces and metrics table

Revision ID: dd1bec36709f
Revises: cd6165f9aeef
Create Date: 2026-01-09 06:49:36.326347

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'dd1bec36709f'
down_revision = 'cd6165f9aeef'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create metrics table
    op.create_table(
        'metrics',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('service_id', sa.Integer(), nullable=True),
        sa.Column('metric_name', sa.String(), nullable=False),
        sa.Column('value', sa.Float(), nullable=False),
        sa.Column('unit', sa.String(), nullable=True),
        sa.Column('timestamp', sa.DateTime(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['service_id'], ['services.id'], )
    )
    op.create_index(op.f('ix_metrics_service_id'), 'metrics', ['service_id'], unique=False)
    op.create_index(op.f('ix_metrics_timestamp'), 'metrics', ['timestamp'], unique=False)

    # Create traces table
    op.create_table(
        'traces',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('trace_id', sa.String(), nullable=False),
        sa.Column('span_id', sa.String(), nullable=False),
        sa.Column('parent_span_id', sa.String(), nullable=True),
        sa.Column('service_id', sa.Integer(), nullable=True),
        sa.Column('operation', sa.String(), nullable=False),
        sa.Column('duration', sa.Float(), nullable=False),
        sa.Column('timestamp', sa.DateTime(), nullable=False),
        sa.Column('status', sa.String(), nullable=True),
        sa.Column('tags', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['service_id'], ['services.id'], )
    )
    op.create_index(op.f('ix_traces_trace_id'), 'traces', ['trace_id'], unique=False)
    op.create_index(op.f('ix_traces_span_id'), 'traces', ['span_id'], unique=False)
    op.create_index(op.f('ix_traces_service_id'), 'traces', ['service_id'], unique=False)
    op.create_index(op.f('ix_traces_timestamp'), 'traces', ['timestamp'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_traces_timestamp'), table_name='traces')
    op.drop_index(op.f('ix_traces_service_id'), table_name='traces')
    op.drop_index(op.f('ix_traces_span_id'), table_name='traces')
    op.drop_index(op.f('ix_traces_trace_id'), table_name='traces')
    op.drop_table('traces')
    
    op.drop_index(op.f('ix_metrics_timestamp'), table_name='metrics')
    op.drop_index(op.f('ix_metrics_service_id'), table_name='metrics')
    op.drop_table('metrics')
