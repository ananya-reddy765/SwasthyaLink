import React from "react";
import { ShieldCheck, User } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  const rows = [
    { label: "Healthcare Worker Name", value: user?.workerName || "Dr. Anjali Rao" },
    { label: "Role", value: user?.workerRole || "Duty Medical Officer" },
    { label: "Facility", value: user?.facilityName || "Narayankhed PHC" },
    { label: "Facility Type", value: user?.facilityType || "Hospital / PHC" },
    { label: "Phone", value: "+91 90000 00000" },
    { label: "Email", value: user?.identifier || "worker@facility.org" },
  ];

  return (
    <DashboardLayout title="Profile" subtitle="Your account and facility details">
      <div className="max-w-xl bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
            <User size={28} />
          </div>
          <div>
            <p className="font-display font-semibold text-lg text-ink">{user?.workerName || "Dr. Anjali Rao"}</p>
            <span className="badge bg-brand-50 text-brand-600 mt-1"><ShieldCheck size={12} /> Verified Account</span>
          </div>
        </div>
        <dl className="space-y-3 text-sm">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between border-b border-slate-100 pb-2">
              <dt className="text-slate-500">{r.label}</dt>
              <dd className="text-ink font-medium">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </DashboardLayout>
  );
}
