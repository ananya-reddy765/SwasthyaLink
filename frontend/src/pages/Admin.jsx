import React, { useState } from "react";
import { Building2, ShieldCheck, Clock, ClipboardList, AlertTriangle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import DashboardCard from "../components/DashboardCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { adminSummary, pendingFacilities as initialFacilities } from "../data/dummyData.js";

export default function Admin() {
  const [rows, setRows] = useState(initialFacilities);

  const setStatus = (id, status) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Verify facilities and monitor platform activity">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <DashboardCard icon={Building2} label="Total Facilities" value={adminSummary.totalFacilities} />
        <DashboardCard icon={ShieldCheck} label="Verified" value={adminSummary.verifiedFacilities} />
        <DashboardCard icon={Clock} label="Pending Verification" value={adminSummary.pendingVerification} tone="amber" />
        <DashboardCard icon={ClipboardList} label="Active Requests" value={adminSummary.activeRequests} />
        <DashboardCard icon={AlertTriangle} label="Emergency Requests" value={adminSummary.emergencyRequests} tone="rose" />
      </div>

      <h2 className="font-display font-semibold text-lg text-ink mb-4">Facility Verification</h2>
      <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-mist text-slate-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Facility</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Documents</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-ink font-medium">{f.name}</td>
                <td className="px-4 py-3 text-slate-500">{f.type}</td>
                <td className="px-4 py-3 text-slate-500">{f.location}</td>
                <td className="px-4 py-3"><StatusBadge status={f.status} /></td>
                <td className="px-4 py-3 text-brand-600 hover:underline cursor-pointer">{f.documents}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => setStatus(f.id, "Approved")} className="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-medium hover:bg-brand-600">
                    Approve
                  </button>
                  <button onClick={() => setStatus(f.id, "Rejected")} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-rose-600 hover:bg-rose-50">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
