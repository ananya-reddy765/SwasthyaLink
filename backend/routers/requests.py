from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId

from database import requests_collection, facilities_collection, resources_collection
from models import ResourceRequestCreate, RequestStatusEnum
from auth_utils import get_current_user
from ai.matching import rank_facilities

router = APIRouter(prefix="/api/requests", tags=["requests"])


@router.post("/search", response_model=list)
async def search_resources(payload: ResourceRequestCreate):
    """
    Core matching endpoint used by the 'Resource Search & Request' screen.
    Finds verified facilities with the requested resource type and ranks
    them using the AI Smart Resource Matching module.
    """
    cursor = resources_collection.find({"resource_type": payload.resource_type})
    candidates = [doc async for doc in cursor]

    if not candidates:
        return []

    ranked = rank_facilities(candidates, urgency=payload.urgency)
    return ranked


@router.post("/", response_model=dict)
async def create_request(payload: ResourceRequestCreate, user: dict = Depends(get_current_user)):
    doc = payload.dict()
    doc["requested_by_facility_id"] = user.get("sub")
    doc["status"] = RequestStatusEnum.pending
    doc["timeline"] = [{"time": datetime.utcnow().isoformat(), "event": "Request sent"}]
    result = await requests_collection.insert_one(doc)
    return {"id": str(result.inserted_id), "message": "Request created"}


@router.get("/{request_id}", response_model=dict)
async def get_request(request_id: str):
    doc = await requests_collection.find_one({"_id": ObjectId(request_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Request not found")
    doc["_id"] = str(doc["_id"])
    return doc


@router.patch("/{request_id}/status", response_model=dict)
async def update_status(request_id: str, status: RequestStatusEnum, user: dict = Depends(get_current_user)):
    result = await requests_collection.update_one(
        {"_id": ObjectId(request_id)},
        {
            "$set": {"status": status},
            "$push": {"timeline": {"time": datetime.utcnow().isoformat(), "event": f"Status changed to {status}"}},
        },
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"message": "Status updated"}
