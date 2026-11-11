from fastapi import APIRouter, Depends
from database import notifications_collection
from auth_utils import get_current_user

router = APIRouter(prefix="/api/notifications", tags=["notifications"])


@router.get("/", response_model=list)
async def list_notifications(user: dict = Depends(get_current_user)):
    cursor = notifications_collection.find({"facility_id": user.get("sub")}).sort("created_at", -1)
    items = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        items.append(doc)
    return items


@router.patch("/{notification_id}/read", response_model=dict)
async def mark_read(notification_id: str):
    from bson import ObjectId
    await notifications_collection.update_one({"_id": ObjectId(notification_id)}, {"$set": {"read": True}})
    return {"message": "Marked as read"}
