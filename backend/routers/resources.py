from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId

from database import resources_collection, facilities_collection
from models import Resource
from auth_utils import get_current_user

router = APIRouter(prefix="/api/resources", tags=["resources"])


@router.post("/", response_model=dict)
async def create_or_update_resource(payload: Resource, user: dict = Depends(get_current_user)):
    """Facility staff update their own available resources here."""
    doc = payload.dict(exclude_unset=True)
    result = await resources_collection.update_one(
        {"facility_id": payload.facility_id, "resource_type": payload.resource_type},
        {"$set": doc},
        upsert=True,
    )
    return {"message": "Resource updated", "matched": result.matched_count, "upserted": bool(result.upserted_id)}


@router.get("/facility/{facility_id}", response_model=list)
async def get_facility_resources(facility_id: str):
    cursor = resources_collection.find({"facility_id": facility_id})
    resources = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        resources.append(doc)
    return resources


@router.get("/facility/{facility_id}/donors", response_model=list)
async def get_donors(facility_id: str, user: dict = Depends(get_current_user)):
    """
    Donor details are only relevant for Blood Bank facilities and should only
    be exposed to that facility's own authenticated staff (role-based access).
    In production, add a check here that `user`'s facility_id matches facility_id
    and that the facility's type is Blood Bank before returning donor contact info.
    """
    facility = await facilities_collection.find_one({"_id": ObjectId(facility_id)})
    if not facility or facility.get("facility_type") != "Blood Bank":
        raise HTTPException(status_code=403, detail="Donor details are only available to Blood Bank facilities")

    resource = await resources_collection.find_one(
        {"facility_id": facility_id, "resource_type": "blood_bank"}
    )
    return (resource or {}).get("donors", [])
