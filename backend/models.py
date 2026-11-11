"""
Pydantic models used across the SwasthyaLink backend.
Only the six approved resource categories are modelled:
Blood Bank, Milk Bank, Oxygen, Ambulance, Medicine, Specialist.
No hospital/ICU bed fields, and no full patient medical records.
"""
from datetime import datetime
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field


class RoleEnum(str, Enum):
    admin = "admin"
    facility_admin = "facility_admin"
    healthcare_worker = "healthcare_worker"
    resource_provider = "resource_provider"


class FacilityTypeEnum(str, Enum):
    hospital = "Hospital"
    phc = "PHC"
    blood_bank = "Blood Bank"
    milk_bank = "Milk Bank"
    pharmacy = "Pharmacy"
    diagnostic_centre = "Diagnostic Centre"
    ambulance_service = "Ambulance Service"
    other = "Other"


class ResourceTypeEnum(str, Enum):
    blood_bank = "blood_bank"
    milk_bank = "milk_bank"
    oxygen = "oxygen"
    ambulance = "ambulance"
    medicine = "medicine"
    specialist = "specialist"


class UrgencyEnum(str, Enum):
    normal = "Normal"
    high = "High"
    emergency = "Emergency"


class RequestStatusEnum(str, Enum):
    pending = "Pending"
    accepted = "Accepted"
    in_progress = "In Progress"
    completed = "Completed"
    rejected = "Rejected"


# ---------- Auth ----------

class UserRegister(BaseModel):
    email: EmailStr
    phone: str
    password: str
    role: RoleEnum = RoleEnum.healthcare_worker
    facility_id: Optional[str] = None


class UserLogin(BaseModel):
    identifier: str  # email or phone
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------- Facilities ----------

class FacilityRegister(BaseModel):
    facility_type: FacilityTypeEnum
    facility_name: str
    address: str
    state: str
    district: str
    phone: str
    email: EmailStr
    authorized_person: str
    password: str
    # document uploaded separately via multipart/form-data


class Facility(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    facility_type: FacilityTypeEnum
    facility_name: str
    address: str
    state: str
    district: str
    phone: str
    email: EmailStr
    authorized_person: str
    verified: bool = False
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ---------- Resources ----------

class BloodStock(BaseModel):
    group: str  # O+, O-, A+, A-, B+, B-, AB+, AB-
    units: int


class Resource(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    facility_id: str
    resource_type: ResourceTypeEnum
    # Blood Bank
    blood_stock: Optional[List[BloodStock]] = None
    # Milk Bank
    milk_units: Optional[int] = None
    donor_info: Optional[str] = None
    # Oxygen
    oxygen_cylinders: Optional[int] = None
    oxygen_concentrators: Optional[int] = None
    # Ambulance
    ambulances_available: Optional[int] = None
    ambulance_type: Optional[str] = None  # Basic / Advanced / Emergency
    # Medicine
    medicine_name: Optional[str] = None
    medicine_quantity: Optional[int] = None
    # Specialist
    specialization: Optional[str] = None
    available_hours: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Donor(BaseModel):
    """Blood donor record, visible to Blood Bank facility users only."""
    name: str
    blood_group: str
    last_donation_date: Optional[str] = None
    contact: str
    eligible: bool = True


# ---------- Requests ----------

class ResourceRequestCreate(BaseModel):
    resource_type: ResourceTypeEnum
    description: str  # e.g. "2 units of O+ blood"
    quantity: int
    location: str
    urgency: UrgencyEnum = UrgencyEnum.normal
    target_facility_id: Optional[str] = None  # set once AI suggests a match


class ResourceRequest(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    requested_by_facility_id: str
    resource_type: ResourceTypeEnum
    description: str
    quantity: int
    location: str
    urgency: UrgencyEnum
    target_facility_id: Optional[str] = None
    status: RequestStatusEnum = RequestStatusEnum.pending
    timeline: List[dict] = Field(default_factory=list)  # [{time, event}]
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ---------- Notifications ----------

class Notification(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    facility_id: str
    type: str  # Requests / Alerts / System
    title: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False


# ---------- Receipts ----------

class ReceiptUpload(BaseModel):
    patient_reference_id: str
    receipt_number: str
    date: str
    remarks: Optional[str] = None
    # file uploaded separately via multipart/form-data


class Receipt(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    facility_id: str
    patient_reference_id: str
    receipt_number: str
    date: str
    remarks: Optional[str] = None
    file_path: Optional[str] = None
    status: str = "Pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)
