import React from "react";
import { ClipboardList, PackageCheck, Loader2, AlertTriangle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import DashboardCard from "../components/DashboardCard.jsx";
import ResourceCard from "../components/ResourceCard.jsx";
import RequestCard from "../components/RequestCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { dashboardSummary, resourceOverview, recentRequests, facilities } from "../data/dummyData.js";

export default function Dashboard() {
  const { user } = useAuth();
  const isBloodBank = user?.role === "blood_bank";
  const isMilkBank = user?.role === "milk_bank";
  const isAmbulance = user?.role === "ambulance";
  const bloodBankFacility = facilities.find((f) => f.type === "Blood Bank");

  return (
    <DashboardLayout title="Dashboard" subtitle={`Welcome back, ${user?.workerName || "Healthcare Worker"}`}>
      {/* Summary cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard icon={ClipboardList} label="Active Requests" value={dashboardSummary.activeRequests} tone="brand" />
        <DashboardCard icon={PackageCheck} label="Resources Available" value={dashboardSummary.resourcesAvailable} tone="brand" />
        <DashboardCard icon={Loader2} label="In Coordination" value={dashboardSummary.inCoordination} tone="amber" />
        <DashboardCard icon={AlertTriangle} label="Emergency Requests" value={dashboardSummary.emergencyRequests} tone="rose" />
      </div>

      {/* Role-specific panel */}
      {isBloodBank && bloodBankFacility && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-ink">Blood Stock by Group</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {bloodBankFacility.stock.map((s) => (
              <div key={s.group} className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-4 text-center">
                <p className="text-2xl font-display font-bold text-brand-600">{s.group}</p>
                <p className="text-sm text-slate-500 mt-1">{s.units} units</p>
              </div>
            ))}
          </div>

          <h2 className="font-display font-semibold text-lg text-ink mb-4">Donor Details</h2>
          <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-mist text-slate-500 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Donor Name</th>
                  <th className="px-4 py-3 font-medium">Blood Group</th>
                  <th className="px-4 py-3 font-medium">Last Donation</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Eligibility</th>
                </tr>
              </thead>
              <tbody>
                {bloodBankFacility.donors.map((d, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-ink font-medium">{d.name}</td>
                    <td className="px-4 py-3">{d.group}</td>
                    <td className="px-4 py-3 text-slate-500">{d.lastDonation}</td>
                    <td className="px-4 py-3 text-slate-500">{d.contact}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={d.eligible ? "Approved" : "Pending"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isMilkBank && (
        <div className="mb-8 bg-white rounded-xl2 border border-slate-100 shadow-soft p-5">
          <h2 className="font-display font-semibold text-lg text-ink mb-3">Human Milk Availability</h2>
          <p className="text-sm text-slate-500 mb-1">Pasteurized units available: <span className="font-semibold text-ink">15</span></p>
          <p className="text-sm text-slate-500">Active donors this week: <span className="font-semibold text-ink">6</span></p>
        </div>
      )}

      {isAmbulance && (
        <div className="mb-8 bg-white rounded-xl2 border border-slate-100 shadow-soft p-5">
          <h2 className="font-display font-semibold text-lg text-ink mb-3">Fleet Status</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-mist"><p className="text-sm text-slate-500">Basic Life Support</p><p className="text-xl font-display font-bold text-ink">3 available</p></div>
            <div className="p-3 rounded-lg bg-mist"><p className="text-sm text-slate-500">Advanced Life Support</p><p className="text-xl font-display font-bold text-ink">2 available</p></div>
          </div>
        </div>
      )}

      {/* Resource overview - always shown, limited to the 6 approved resource types */}
      <div className="mb-8">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Resource Overview</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {resourceOverview.map((r) => (
            <ResourceCard key={r.type} type={r.type} label={r.label} value={r.value} />
          ))}
        </div>
      </div>

      {/* Recent requests */}
      <div>
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Recent Requests</h2>
        <div className="space-y-3">
          {recentRequests.map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
