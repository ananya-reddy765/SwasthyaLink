from fastapi import APIRouter, HTTPException
from bson import ObjectId

from database import users_collection
from models import UserRegister, UserLogin, Token
from auth_utils import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=dict)
async def register(payload: UserRegister):
    existing = await users_collection.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    user_doc = payload.dict()
    user_doc["password"] = hash_password(payload.password)
    result = await users_collection.insert_one(user_doc)
    return {"id": str(result.inserted_id), "message": "User registered successfully"}


@router.post("/login", response_model=Token)
async def login(payload: UserLogin):
    user = await users_collection.find_one(
        {"$or": [{"email": payload.identifier}, {"phone": payload.identifier}]}
    )
    if not user or not verify_password(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user["_id"]), "role": user.get("role")})
    return Token(access_token=token)
