from models.organization_model import OrganizationModel
from schemas.organization_schema import OrganizationCreateSchema, OrganizationResponseSchema
from sqlalchemy.orm import Session
from core.config import get_logger
import uuid

logger = get_logger(__name__)

class OrganizationService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_organization_for_user(self, user_id: str, org_name: str = None) -> OrganizationResponseSchema:
        """Auto-create organization when user signs up"""
        # Use username or email as org name if not provided
        org_name = org_name or f"{user_id}-org"
        
        logger.info(f"Creating organization for user: {user_id}")
        try:
            new_organization = OrganizationModel(
                id=str(uuid.uuid4()),
                name=org_name,
                owner_id=user_id
            )
            self.db.add(new_organization)
            self.db.commit()
            self.db.refresh(new_organization)
            logger.info(f"Organization created: {org_name} for user: {user_id}")
            return OrganizationResponseSchema.model_validate(new_organization)
        except Exception as e:
            logger.error(f"Error creating organization: {e}")
            self.db.rollback()
            raise
    
    def create_organization(self, organization: OrganizationCreateSchema, user_id: str) -> OrganizationResponseSchema:
        """Manual org creation (for admin panel later)"""
        logger.info(f"Creating organization: {organization.name}")
        try:
            new_organization = OrganizationModel(
                id=str(uuid.uuid4()),
                name=organization.name,
                owner_id=user_id
            )
            self.db.add(new_organization)
            self.db.commit()
            self.db.refresh(new_organization)
            logger.info(f"Organization created: {organization.name}")
            return OrganizationResponseSchema.model_validate(new_organization)
        except Exception as e:
            logger.error(f"Error creating organization: {e}")
            self.db.rollback()
            raise