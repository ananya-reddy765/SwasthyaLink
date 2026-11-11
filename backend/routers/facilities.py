from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from bson.errors import InvalidId

from database import facilities_collection
from models import FacilityRegister
from auth_utils import hash_password, require_role, get_current_user

router = APIRouter(prefix="/api/facilities", tags=["facilities"])


@router.post("/register", response_model=dict)
async def register_facility(payload: FacilityRegister):
    """
    A facility is NOT active until an admin approves it (see /api/admin/verify).
    """
    doc = payload.dict()
    doc["password"] = hash_password(payload.password)
    doc["verified"] = False
    result = await facilities_collection.insert_one(doc)
    return {"id": str(result.inserted_id), "message": "Registration submitted. Pending admin verification."}


@router.get("/", response_model=list)
async def list_facilities(facility_type: str | None = None, verified_only: bool = True):
    query = {}
    if facility_type:
        query["facility_type"] = facility_type
    if verified_only:
        query["verified"] = True

    cursor = facilities_collection.find(query)
    facilities = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        doc.pop("password", None)
        facilities.append(doc)
    return facilities


@router.get("/{facility_id}", response_model=dict)
async def get_facility(facility_id: str):
    try:
        oid = ObjectId(facility_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid facility id")

    doc = await facilities_collection.find_one({"_id": oid})
    if not doc:
        raise HTTPException(status_code=404, detail="Facility not found")
    doc["_id"] = str(doc["_id"])
    doc.pop("password", None)
    return doc
