from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from datetime import timedelta
from schemas.user_schema import LoginSchema, UserCreateSchema, UserResponseSchema
from services.user_service import UserService
from core.security import create_access_token, create_refresh_token, get_current_user, validate_refresh_token
from core.config import settings, get_logger
from core.database import get_db

logger = get_logger(__name__)

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


class AuthResponse(UserResponseSchema):
    """Response model for auth endpoints"""
    pass


@router.post("/register", response_model=UserResponseSchema)
async def register(user: UserCreateSchema, db: Session = Depends(get_db)):
    """Register a new user"""
    logger.info(f"New registration attempt for: {user.email}")
    try:
        user_service = UserService(db)
        created_user = user_service.create_user(user)
        return created_user
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
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


@router.post("/login", response_model=UserResponseSchema)
async def login(credentials: LoginSchema, db: Session = Depends(get_db)):
    """
    Login and get JWT tokens (stored in secure cookies)
    
    Usage:
    POST /api/v1/auth/login
    Body: {"email": "user@example.com", "password": "password123"}
    """
    try: 
        logger.info(f"Login attempt for: {credentials.email}")
        user_service = UserService(db)
        user = user_service.authenticate_user(credentials.email, credentials.password)
    
        if not user:
            logger.warning(f"Failed login for: {credentials.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
    
        logger.info(f"Successful login for: {credentials.email}")
        return user
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error for {credentials.email}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )


@router.get("/me")
async def get_current_user_info(current_user: str = Depends(get_current_user)):
    """
    Get current logged-in user info (protected route)
    
    Usage:
    GET /api/v1/auth/me
    Headers: Authorization: Bearer {token}
    """
    try:
        logger.info(f"User info requested for: {current_user}")
        return JSONResponse(
            status_code=200,
            content={"email": current_user}
        )
    except Exception as e:
        logger.error(f"Error fetching user info: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not fetch user info"
        )


@router.post("/logout")
async def logout():
    """
    Logout and clear cookies
    """
    try:     
        response = JSONResponse(
        status_code=200,
        content={"message": "Logged out successfully"}
    )
    
        # Clear cookies
        response.delete_cookie(key="access_token", httponly=True, secure=True, samesite="lax")
        response.delete_cookie(key="refresh_token", httponly=True, secure=True, samesite="lax")
    
        return response
    except Exception as e:
        logger.error(f"Logout error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Logout failed"
        )


@router.post("/refresh-token")
async def refresh_token(request: Request):
    """
    Refresh access token using refresh token from cookie
    
    Usage:
    POST /api/v1/auth/refresh-token
    Cookies: refresh_token=...
    """
    try:
        # Get refresh token from cookies
        refresh_token_cookie = request.cookies.get("refresh_token")
        if not refresh_token_cookie:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token not found"
            )
        
        # Validate refresh token and get user email
        user_email = validate_refresh_token(refresh_token_cookie)
        
        # Create new access token
        expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        new_access_token = create_access_token(
            data={"sub": user_email},
            expires_delta=expires_delta
        )
        
        logger.info(f"Token refreshed for: {user_email}")
        
        # Create response
        response = JSONResponse(
            status_code=200,
            content={"message": "Token refreshed successfully"}
        )
        
        # Set new access token cookie
        response.set_cookie(
            key="access_token",
            value=new_access_token,
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            httponly=True,
            secure=True,
            samesite="lax"
        )
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Token refresh error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )