"""
SwasthyaLink backend entry point.

Run locally with:
    uvicorn main:app --reload --port 8000

Requires a MongoDB Atlas connection string in backend/.env
(copy backend/.env.example to backend/.env first).
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import is_mongodb_configured, ping_mongodb

from routers import auth, facilities, resources, requests, notifications, receipts, analytics, admin

app = FastAPI(
    title="SwasthyaLink API",
    description=(
        "AI-powered healthcare resource coordination platform connecting "
        "verified healthcare facilities — hospitals, PHCs, blood banks, "
        "milk banks, pharmacies, diagnostic centres, ambulance services "
        "and specialists — for faster resource discovery in rural and "
        "underserved areas."
    ),
    version="1.0.0",
)

# In production, restrict allow_origins to your deployed frontend URL(s).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(facilities.router)
app.include_router(resources.router)
app.include_router(requests.router)
app.include_router(notifications.router)
app.include_router(receipts.router)
app.include_router(analytics.router)
app.include_router(admin.router)


@app.get("/")
async def root():
    return {"status": "ok", "service": "SwasthyaLink API"}


@app.get("/health")
async def health():
    mongodb = await ping_mongodb()
    return {
        "status": "healthy",
        "mongodb_configured": is_mongodb_configured(),
        "mongodb_connected": mongodb,
        "mode": "connected" if mongodb else "demo",
    }
