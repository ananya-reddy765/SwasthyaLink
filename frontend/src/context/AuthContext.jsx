import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Facility types drive which dashboard view a user sees after login.
// This mirrors the backend "role-based access" requirement without
// needing a real API call yet — swap loginMock() for a real API call
// once backend/routers/auth.py is connected.
export const FACILITY_TYPES = [
  { id: "hospital", label: "Hospital / PHC" },
  { id: "blood_bank", label: "Blood Bank" },
  { id: "milk_bank", label: "Milk Bank" },
  { id: "pharmacy", label: "Pharmacy" },
  { id: "diagnostic", label: "Diagnostic Centre" },
  { id: "ambulance", label: "Ambulance Service" },
  { id: "admin", label: "System Admin" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem("swasthyalink_user");
    return raw ? JSON.parse(raw) : null;
  });

  const loginMock = ({ facilityType, facilityName, identifier }) => {
    const role = facilityType || "hospital";
    const newUser = {
      identifier,
      role, // e.g. blood_bank, hospital, admin
      isAdmin: role === "admin",
      facilityName:
        facilityName ||
        (role === "admin" ? "SwasthyaLink Admin" : "Narayankhed PHC"),
      facilityType: FACILITY_TYPES.find((f) => f.id === role)?.label || "Hospital / PHC",
      verified: true,
      workerName: "Dr. Anjali Rao",
      workerRole: "Duty Medical Officer",
    };
    sessionStorage.setItem("swasthyalink_user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    sessionStorage.removeItem("swasthyalink_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginMock, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
