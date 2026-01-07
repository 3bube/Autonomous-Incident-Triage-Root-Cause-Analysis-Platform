from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from schemas.dashboard_schema import DashboardResponseSchema

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/", response_model=DashboardResponseSchema)
async def get_dashboard(
    db: Session = Depends(get_db)
):
    """
    Get dashboard overview data including:
    - Key stats (Active Incidents, MTTR, Noise Reduction, System Health)
    - Recent incidents
    - Alert summary
    """
    # TODO: Implement actual dashboard data aggregation
    return {
        "stats": {
            "active_incidents": {
                "label": "Active Incidents",
                "value": "3",
                "trend": {"value": "↑ 1", "is_positive": False},
                "meta": "vs. last 24 hours"
            },
            "mttr": {
                "label": "MTTR (AVG)",
                "value": "45m",
                "trend": {"value": "↓ 5m", "is_positive": True},
                "meta": "Mean time to resolution"
            },
            "noise_reduction": {
                "label": "Noise Reduction",
                "value": "99.2%",
                "trend": {"value": "+2.1%", "is_positive": True},
                "meta": "AI Signal-to-Noise Ratio"
            },
            "system_health": {
                "label": "System Health",
                "value": "98%",
                "trend": {"value": "+0.5%", "is_positive": True},
                "meta": None
            }
        },
        "recent_incidents": [],
        "alert_summary": {
            "total_alerts_24h": 14203,
            "critical_alerts": 42,
            "suppressed_alerts": 1204,
            "correlation_rate": 94.2
        }
    }
