from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from services.user_service import UserService
from schemas.user_schema import UserCreateSchema, UserResponseSchema
from core.config import get_logger


logger = get_logger(__name__)


class UserController:
    def __init__(self, user_service: UserService = Depends()):
        self.user_service = user_service

    def create_user(self, user: UserCreateSchema) -> JSONResponse:
        try:
            logger.info(f"Controller: Creating user {user.email}")
            created_user = self.user_service.create_user(user)
            return JSONResponse(status_code=201, content=UserResponseSchema.model_validate(created_user).model_dump())
        except Exception as e:
            logger.error(f"Controller: Error creating user {user.email} - {e}")
            raise HTTPException(status_code=400, detail=str(e))

    def get_user(self, email: str) -> JSONResponse:
        try:
            logger.info(f"Controller: Getting user {email}")
            user = self.user_service.get_user_by_email(email)
            if user:
                logger.info(f"Controller: User found {email}")
                return JSONResponse(status_code=200, content=UserResponseSchema.model_validate(user).model_dump())
            raise HTTPException(status_code=404, detail="User not found")
        except Exception as e:
            logger.error(f"Controller: Error getting user {email} - {e}")
            raise HTTPException(status_code=400, detail=str(e))

    def authenticate_user(self, email: str, password: str) -> JSONResponse:
        try:
            logger.info(f"Controller: Authenticating user {email}")
            user = self.user_service.authenticate_user(email, password)
            if user:
                return JSONResponse(status_code=200, content=user.model_dump())
            raise HTTPException(status_code=401, detail="Invalid credentials")
        except Exception as e:
            logger.error(f"Controller: Error authenticating user {email} - {e}")
            raise HTTPException(status_code=400, detail=str(e))