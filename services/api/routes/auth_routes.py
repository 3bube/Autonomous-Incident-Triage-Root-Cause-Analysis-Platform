from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from datetime import timedelta

from schemas.user_schema import UserCreateSchema, UserResponseSchema
from services.user_service import UserService
from core.security import create_access_token, get_current_user
from core.config import settings, get_logger
from core.database import get_db

logger = get_logger(__name__)

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/register")
async def register(user: UserCreateSchema, db: Session = Depends(get_db)):
    """Register a new user"""
    logger.info(f"New registration attempt for: {user.email}")
    try:
        user_service = UserService(db)
        created_user = user_service.create_user(user)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"message": "User created successfully", "user": created_user.model_dump()}
        )
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(email: str, password: str, db: Session = Depends(get_db)):
    """
    Login and get JWT access token
    
    Usage:
    POST /api/v1/auth/login?email=user@example.com&password=password123
    
    Response:
    {
        "access_token": "eyJhbGc...",
        "token_type": "bearer",
        "expires_in": 1800
    }
    """
    logger.info(f"Login attempt for: {email}")
    user_service = UserService(db)
    user = user_service.authenticate_user(email, password)
    
    if not user:
        logger.warning(f"Failed login for: {email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create access token (expires in 30 minutes as per config)
    expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},  # "sub" = subject (standard JWT claim)
        expires_delta=expires_delta
    )
    
    logger.info(f"Successful login for: {email}")
    return JSONResponse(
        status_code=200,
        content={
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # in seconds
            "user": user.model_dump()
        }
    )


@router.get("/me")
async def get_current_user_info(current_user: str = Depends(get_current_user)):
    """
    Get current logged-in user info (protected route)
    
    Usage:
    GET /api/v1/auth/me
    Headers: Authorization: Bearer {token}
    """
    logger.info(f"User info requested for: {current_user}")
    return JSONResponse(
        status_code=200,
        content={"email": current_user}
    )
