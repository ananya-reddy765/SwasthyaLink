// Demo data for the SwasthyaLink prototype.
// The real backend will replace this data after MongoDB integration.

export const RESOURCE_TYPES = [
  { id: "blood_bank", label: "Blood Bank", unit: "units" },
  { id: "milk_bank", label: "Milk Bank", unit: "units" },
  { id: "oxygen", label: "Oxygen", unit: "cylinders" },
  { id: "ambulance", label: "Ambulance", unit: "available" },
  { id: "medicine", label: "Medicine", unit: "items" },
  { id: "specialist", label: "Specialist", unit: "available" },
];

export const BLOOD_GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

export const dashboardSummary = {
  activeRequests: 4,
  resourcesAvailable: 6,
  inCoordination: 2,
  emergencyRequests: 1,
};

export const resourceOverview = [
  { type: "blood_bank", label: "Blood Bank", value: "8 units available" },
  { type: "milk_bank", label: "Milk Bank", value: "15 units available" },
  { type: "oxygen", label: "Oxygen", value: "10 cylinders" },
  { type: "ambulance", label: "Ambulance", value: "5 available" },
  { type: "medicine", label: "Medicine", value: "120+ items" },
  { type: "specialist", label: "Specialists", value: "12 available" },
];

export const recentRequests = [
  { id: "REQ-1042", resource: "Blood Bank (O+)", status: "Accepted", requestedBy: "Narayankhed PHC", time: "10 min ago" },
  { id: "REQ-1041", resource: "Oxygen (Cylinder)", status: "In Progress", requestedBy: "Zaheerabad CHC", time: "45 min ago" },
  { id: "REQ-1039", resource: "Ambulance (Advanced)", status: "Completed", requestedBy: "Sadasivpet PHC", time: "2 hr ago" },
  { id: "REQ-1035", resource: "Specialist (Cardiologist)", status: "Pending", requestedBy: "Rural Hospital, Zaheerabad", time: "3 hr ago" },
  { id: "REQ-1030", resource: "Medicine (Insulin)", status: "Rejected", requestedBy: "Community Health Centre", time: "5 hr ago" },
];

export const facilities = [
  {
    id: "fac-001",
    name: "City Blood Bank",
    type: "Blood Bank",
    resourceType: "blood_bank",
    verified: true,
    distanceKm: 5.2,
    travelMinutes: 12,
    address: "MG Road, Sangareddy, Telangana",
    phone: "+91 90000 10001",
    hours: "24 x 7",
    availability: "High Availability",
    stock: [
      { group: "O+", units: 5 }, { group: "A+", units: 3 }, { group: "B+", units: 4 }, { group: "AB+", units: 1 },
    ],
    donors: [
      { name: "Ravi Kumar", group: "O+", lastDonation: "2026-06-12", contact: "+91 98765 43210", eligible: true },
      { name: "Sunitha Reddy", group: "O+", lastDonation: "2026-07-02", contact: "+91 98765 43211", eligible: true },
      { name: "Manoj Patel", group: "A+", lastDonation: "2026-05-20", contact: "+91 98765 43212", eligible: true },
      { name: "Farida Begum", group: "B+", lastDonation: "2026-08-01", contact: "+91 98765 43213", eligible: false },
    ],
  },
  {
    id: "fac-002",
    name: "Sangareddy District Hospital",
    type: "Hospital",
    resourceType: "oxygen",
    verified: true,
    distanceKm: 8.7,
    travelMinutes: 18,
    address: "Hospital Road, Sangareddy, Telangana",
    phone: "+91 90000 10002",
    hours: "24 x 7",
    availability: "Moderate Availability",
    stock: [
      { group: "Oxygen Cylinders", units: 12 },
      { group: "Oxygen Concentrators", units: 4 },
    ],
  },
  {
    id: "fac-003",
    name: "Mother's Milk Bank, Zaheerabad",
    type: "Milk Bank",
    resourceType: "milk_bank",
    verified: true,
    distanceKm: 14.3,
    travelMinutes: 26,
    address: "Zaheerabad, Telangana",
    phone: "+91 90000 10003",
    hours: "8 AM – 8 PM",
    availability: "High Availability",
    stock: [{ group: "Pasteurized Human Milk", units: 15 }],
  },
  {
    id: "fac-004",
    name: "Rapid Response Ambulance Service",
    type: "Ambulance Service",
    resourceType: "ambulance",
    verified: true,
    distanceKm: 3.1,
    travelMinutes: 7,
    address: "Bus Stand Road, Sadasivpet, Telangana",
    phone: "+91 90000 10004",
    hours: "24 x 7",
    availability: "5 Available",
    stock: [
      { group: "Basic Life Support", units: 3 },
      { group: "Advanced Life Support", units: 2 },
    ],
  },
  {
    id: "fac-005",
    name: "Hope Pharmacy",
    type: "Pharmacy",
    resourceType: "medicine",
    verified: true,
    distanceKm: 6.4,
    travelMinutes: 14,
    address: "Main Market Road, Narayankhed, Telangana",
    phone: "+91 90000 10005",
    hours: "8 AM – 10 PM",
    availability: "High Availability",
    stock: [
      { group: "Insulin", units: 40 },
      { group: "Paracetamol", units: 120 },
      { group: "Amoxicillin", units: 60 },
    ],
  },
  {
    id: "fac-006",
    name: "Lifeline Specialist Centre",
    type: "Specialist Centre",
    resourceType: "specialist",
    verified: true,
    distanceKm: 11.2,
    travelMinutes: 22,
    address: "Clinic Road, Sangareddy, Telangana",
    phone: "+91 90000 10006",
    hours: "9 AM – 6 PM",
    availability: "3 Specialists Available",
    stock: [
      { group: "Cardiologist", units: 1 },
      { group: "Paediatrician", units: 1 },
      { group: "General Physician", units: 1 },
    ],
  },
  {
    id: "fac-007",
    name: "District Emergency Oxygen Centre",
    type: "Oxygen Centre",
    resourceType: "oxygen",
    verified: true,
    distanceKm: 12.6,
    travelMinutes: 25,
    address: "Emergency Services Road, Sangareddy, Telangana",
    phone: "+91 90000 10007",
    hours: "24 x 7",
    availability: "High Availability",
    stock: [
      { group: "Oxygen Cylinders", units: 25 },
      { group: "Oxygen Concentrators", units: 6 },
    ],
  },
];

export const notifications = [
  { id: 1, type: "Requests", title: "Request Accepted", message: "City Blood Bank accepted your request REQ-1042.", time: "10 min ago" },
  { id: 2, type: "Alerts", title: "Emergency Request", message: "Zaheerabad CHC raised an emergency oxygen request nearby.", time: "40 min ago" },
  { id: 3, type: "System", title: "Resource Availability Updated", message: "City Blood Bank updated O+ stock to 5 units.", time: "1 hr ago" },
  { id: 4, type: "Requests", title: "Request Completed", message: "Ambulance request REQ-1039 marked completed.", time: "2 hr ago" },
  { id: 5, type: "Alerts", title: "Low Resource Availability", message: "AB- blood stock is low across nearby facilities.", time: "4 hr ago" },
  { id: 6, type: "System", title: "Facility Verification Approved", message: "Your facility documents were verified by the admin.", time: "1 day ago" },
];

export const demandPrediction = [
  { resource: "Blood O+", level: "High", change: "+40%" },
  { resource: "Milk", level: "Moderate", change: "+20%" },
  { resource: "Oxygen", level: "Moderate", change: "+20%" },
  { resource: "Medicine", level: "Low", change: "+10%" },
  { resource: "Ambulance", level: "Low", change: "+5%" },
  { resource: "Specialist", level: "Moderate", change: "+15%" },
];

export const usageTrend = [
  { day: "Mon", blood: 12, oxygen: 8, medicine: 20 },
  { day: "Tue", blood: 15, oxygen: 10, medicine: 18 },
  { day: "Wed", blood: 10, oxygen: 12, medicine: 22 },
  { day: "Thu", blood: 18, oxygen: 9, medicine: 25 },
  { day: "Fri", blood: 22, oxygen: 14, medicine: 21 },
  { day: "Sat", blood: 16, oxygen: 11, medicine: 19 },
  { day: "Sun", blood: 14, oxygen: 7, medicine: 17 },
];

export const receipts = [
  { id: "RCT-2201", date: "2026-09-01", facility: "City Blood Bank", refId: "PT-8841", status: "Verified" },
  { id: "RCT-2198", date: "2026-08-29", facility: "Sangareddy District Hospital", refId: "PT-8790", status: "Pending" },
  { id: "RCT-2190", date: "2026-08-25", facility: "Rapid Response Ambulance Service", refId: "PT-8712", status: "Verified" },
];

export const pendingFacilities = [
  { id: "veri-1", name: "Hope Pharmacy", type: "Pharmacy", location: "Zaheerabad", status: "Pending", documents: "License.pdf" },
  { id: "veri-2", name: "Lifeline Diagnostics", type: "Diagnostic Centre", location: "Sadasivpet", status: "Pending", documents: "Registration.pdf" },
  { id: "veri-3", name: "Grace Milk Bank", type: "Milk Bank", location: "Sangareddy", status: "Approved", documents: "License.pdf" },
];

export const adminSummary = {
  totalFacilities: 128,
  verifiedFacilities: 104,
  pendingVerification: 18,
  activeRequests: 32,
  emergencyRequests: 3,
};
