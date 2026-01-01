from models.user_model import UserModel
from sqlalchemy.orm import Session
from sqlalchemy import select
from schemas.user_schema import UserCreateSchema, UserResponseSchema
from core.security import hash_password, verify_password
from core.config import get_logger

logger = get_logger(__name__)

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: UserCreateSchema) -> UserResponseSchema:
      logger.info(f"Creating user: {user.email}")
      try:
        hashed_password = hash_password(user.password)
        new_user = UserModel(
            username=user.username,
            email=user.email,
            full_name=user.full_name,
            role=user.role.value,
            password=hashed_password
            )
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        logger.info(f"User created: {user.email}")
        return UserResponseSchema.model_validate(new_user)
      except Exception as e:
        logger.error(f"Error creating user: {e}")
        self.db.rollback()
        raise

    def get_user_by_email(self, email: str) -> UserModel | None:
        """Get raw user model (includes password for auth checks)"""
        logger.debug(f"Fetching user by email: {email}")
        user = self.db.query(UserModel).filter(UserModel.email == email).first()
        if user:
            logger.debug(f"User found: {email}")
            return user
        logger.debug(f"User not found: {email}")
        return None

    def authenticate_user(self, email: str, password: str) -> UserResponseSchema | None:
        logger.info(f"Authenticating user: {email}")
        user = self.get_user_by_email(email)
        if user and verify_password(password, user.password):
            logger.info(f"Authentication successful: {email}")
            return UserResponseSchema.model_validate(user)
        logger.warning(f"Authentication failed: {email}")
        return None