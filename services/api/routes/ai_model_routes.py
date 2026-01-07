from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from schemas.ai_model_schema import (
    AIModelListResponseSchema,
    AIModelResponseSchema,
    AIModelRetrainSchema
)

router = APIRouter(prefix="/api/ai-models", tags=["ai-models"])


@router.get("/", response_model=AIModelListResponseSchema)
async def list_ai_models(
    db: Session = Depends(get_db)
):
    """
    Get all AI models with their stats
    """
    # TODO: Implement actual database query
    return {
        "stats": {
            "active_models": 12,
            "global_accuracy": 98.4,
            "alerts_suppressed": 45.2,
            "last_retraining": "2h ago"
        },
        "models": []
    }


@router.get("/{model_id}", response_model=AIModelResponseSchema)
async def get_ai_model(
    model_id: int,
    db: Session = Depends(get_db)
):
    """
    Get detailed information about a specific AI model
    """
    # TODO: Implement actual database query
    raise HTTPException(status_code=404, detail="Model not found")


@router.post("/{model_id}/retrain", status_code=status.HTTP_202_ACCEPTED)
async def retrain_model(
    model_id: int,
    retrain_request: AIModelRetrainSchema,
    db: Session = Depends(get_db)
):
    """
    Trigger model retraining with specified data range
    """
    # TODO: Implement actual retraining trigger
    return {"status": "accepted", "message": "Retraining job submitted"}
