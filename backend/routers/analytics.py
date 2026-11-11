from fastapi import APIRouter
from ai.demand_prediction import predict_demand

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/demand-prediction", response_model=list)
async def demand_prediction():
    """
    Returns predicted demand per resource type for the AI Demand Prediction
    screen. Backed by ai/demand_prediction.py — currently a placeholder
    trend model, intended to be swapped for a real time-series model
    trained on historical request data.
    """
    return predict_demand()
