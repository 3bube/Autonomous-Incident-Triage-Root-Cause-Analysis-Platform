"""fix service enum values to lowercase

Revision ID: cd6165f9aeef
Revises: 5c9c2c59dfab
Create Date: 2026-01-08 14:23:10.482769

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cd6165f9aeef'
down_revision = '5c9c2c59dfab'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Remove defaults first to avoid casting issues
    op.alter_column('services', 'tier', server_default=None)
    op.alter_column('services', 'health_status', server_default=None)
    
    # Drop the old enums and recreate with lowercase values
    op.execute("ALTER TYPE tierenum RENAME TO tierenum_old")
    op.execute("ALTER TYPE servicehealthenum RENAME TO servicehealthenum_old")
    
    # Create new enums with lowercase values
    op.execute("CREATE TYPE tierenum AS ENUM ('critical', 'non_critical')")
    op.execute("CREATE TYPE servicehealthenum AS ENUM ('healthy', 'degraded', 'critical', 'unknown')")
    
    # Update services table to use new enums
    op.execute("ALTER TABLE services ALTER COLUMN tier TYPE tierenum USING tier::text::tierenum")
    op.execute("ALTER TABLE services ALTER COLUMN health_status TYPE servicehealthenum USING health_status::text::servicehealthenum")
    
    # Set new defaults
    op.alter_column('services', 'tier', server_default='non_critical')
    op.alter_column('services', 'health_status', server_default='unknown')
    
    # Drop old enums
    op.execute("DROP TYPE tierenum_old")
    op.execute("DROP TYPE servicehealthenum_old")


def downgrade() -> None:
    # Remove defaults first
    op.alter_column('services', 'tier', server_default=None)
    op.alter_column('services', 'health_status', server_default=None)
    
    # Revert back to uppercase enums
    op.execute("ALTER TYPE tierenum RENAME TO tierenum_old")
    op.execute("ALTER TYPE servicehealthenum RENAME TO servicehealthenum_old")
    
    # Create old enums with uppercase values
    op.execute("CREATE TYPE tierenum AS ENUM ('CRITICAL', 'NON_CRITICAL')")
    op.execute("CREATE TYPE servicehealthenum AS ENUM ('HEALTHY', 'DEGRADED', 'CRITICAL', 'UNKNOWN')")
    
    # Revert services table
    op.execute("ALTER TABLE services ALTER COLUMN tier TYPE tierenum USING tier::text::tierenum")
    op.execute("ALTER TABLE services ALTER COLUMN health_status TYPE servicehealthenum USING health_status::text::servicehealthenum")
    
    # Restore old defaults
    op.alter_column('services', 'tier', server_default='NON_CRITICAL')
    op.alter_column('services', 'health_status', server_default='UNKNOWN')
    
    # Drop old enums
    op.execute("DROP TYPE tierenum_old")
    op.execute("DROP TYPE servicehealthenum_old")
