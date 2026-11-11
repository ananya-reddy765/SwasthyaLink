from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from database import facilities_collection, requests_collection
from auth_utils import require_role

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get("/facilities/pending", response_model=list)
async def pending_facilities(admin: dict = Depends(require_role("admin"))):
    cursor = facilities_collection.find({"verified": False})
    items = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        doc.pop("password", None)
        items.append(doc)
    return items


@router.patch("/facilities/{facility_id}/verify", response_model=dict)
async def verify_facility(facility_id: str, approve: bool, admin: dict = Depends(require_role("admin"))):
    result = await facilities_collection.update_one(
        {"_id": ObjectId(facility_id)}, {"$set": {"verified": approve}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Facility not found")
    return {"message": "Facility approved" if approve else "Facility rejected"}


@router.get("/summary", response_model=dict)
async def platform_summary(admin: dict = Depends(require_role("admin"))):
    total = await facilities_collection.count_documents({})
    verified = await facilities_collection.count_documents({"verified": True})
    pending = await facilities_collection.count_documents({"verified": False})
    active_requests = await requests_collection.count_documents({"status": {"$in": ["Pending", "Accepted", "In Progress"]}})
    emergency_requests = await requests_collection.count_documents({"urgency": "Emergency"})

    return {
        "total_facilities": total,
        "verified_facilities": verified,
        "pending_verification": pending,
        "active_requests": active_requests,
        "emergency_requests": emergency_requests,
    }
