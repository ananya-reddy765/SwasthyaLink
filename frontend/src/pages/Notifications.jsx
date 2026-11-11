import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import NotificationCard from "../components/NotificationCard.jsx";
import { notifications } from "../data/dummyData.js";

const TABS = ["All", "Requests", "Alerts", "System"];

export default function Notifications() {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? notifications : notifications.filter((n) => n.type === tab);

  return (
    <DashboardLayout title="Notifications" subtitle="Stay updated on requests, alerts and system activity">
      <div className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-brand-500 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-mist"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((n) => (
          <NotificationCard key={n.id} notification={n} />
        ))}
        {filtered.length === 0 && <p className="text-slate-400 text-sm">No notifications in this category.</p>}
      </div>
    </DashboardLayout>
  );
}
