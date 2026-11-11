import os
import shutil
import uuid

from fastapi import APIRouter, Depends, UploadFile, File, Form
from database import receipts_collection
from auth_utils import get_current_user

router = APIRouter(prefix="/api/receipts", tags=["receipts"])

UPLOAD_DIR = "uploads/receipts"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", response_model=dict)
async def upload_receipt(
    patient_reference_id: str = Form(...),
    receipt_number: str = Form(...),
    date: str = Form(...),
    remarks: str = Form(""),
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    """
    Stores only a document for coordination purposes — NOT full patient
    medical records — alongside a short reference ID and remarks.
    """
    ext = os.path.splitext(file.filename)[1]
    stored_name = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, stored_name)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    doc = {
        "facility_id": user.get("sub"),
        "patient_reference_id": patient_reference_id,
        "receipt_number": receipt_number,
        "date": date,
        "remarks": remarks,
        "file_path": file_path,
        "status": "Pending",
    }
    result = await receipts_collection.insert_one(doc)
    return {"id": str(result.inserted_id), "message": "Receipt uploaded"}


@router.get("/", response_model=list)
async def list_receipts(user: dict = Depends(get_current_user)):
    cursor = receipts_collection.find({"facility_id": user.get("sub")})
    items = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        items.append(doc)
    return items
