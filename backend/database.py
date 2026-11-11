"""
MongoDB Atlas connection for SwasthyaLink.

The API can start in demo mode even before MongoDB is configured.
For real database operations, create backend/.env from .env.example
and add your MongoDB Atlas URI. Never commit .env or share its password.
"""
import os
from typing import Optional

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "").strip()
DATABASE_NAME = os.getenv("DATABASE_NAME", "swasthyalink")
_client: Optional[AsyncIOMotorClient] = None
db = None

if MONGODB_URI:
    _client = AsyncIOMotorClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    db = _client[DATABASE_NAME]

# Collections. They are None when the project is running without MongoDB.
users_collection = db["users"] if db is not None else None
facilities_collection = db["facilities"] if db is not None else None
resources_collection = db["resources"] if db is not None else None
requests_collection = db["requests"] if db is not None else None
notifications_collection = db["notifications"] if db is not None else None
receipts_collection = db["receipts"] if db is not None else None
analytics_collection = db["analytics"] if db is not None else None


def is_mongodb_configured() -> bool:
    return bool(MONGODB_URI and db is not None)


async def ping_mongodb() -> bool:
    if _client is None:
        return False
    try:
        await _client.admin.command("ping")
        return True
    except Exception:
        return False
