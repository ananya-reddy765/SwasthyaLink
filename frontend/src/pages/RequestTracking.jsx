import React from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";

const STAGES = ["Request Sent", "Facility Confirmed", "In Coordination", "Completed"];

const UPDATES = [
  { time: "10:30 AM", text: "Request sent" },
  { time: "10:35 AM", text: "Facility accepted request" },
  { time: "10:40 AM", text: "Coordination started" },
];

export default function RequestTracking() {
  const { id } = useParams();
  const currentStage = 2; // 0-indexed into STAGES

  return (
    <DashboardLayout title="Active Request Tracking" subtitle={`Request ${id}`}>
      <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6 mb-6">
        <div className="flex items-center justify-between">
          {STAGES.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  i <= currentStage ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {i <= currentStage ? <CheckCircle2 size={18} /> : i + 1}
                </div>
                <span className={`text-xs text-center ${i <= currentStage ? "text-brand-700 font-medium" : "text-slate-400"}`}>{s}</span>
              </div>
              {i < STAGES.length - 1 && (
                <div className={`h-0.5 flex-1 -mt-6 ${i < currentStage ? "bg-brand-500" : "bg-slate-100"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
          <h3 className="font-display font-semibold text-ink mb-4">Request Details</h3>
          <dl className="space-y-3 text-sm">
            <Row label="Request ID" value={id} />
            <Row label="Resource" value="Blood Bank — O+" />
            <Row label="Quantity" value="2 units" />
            <Row label="Requested Facility" value="City Blood Bank" />
            <Row label="Status" value="In Coordination" />
            <Row label="Estimated Time" value="15 minutes" />
            <Row label="Contact Person" value="Mr. Suresh Naik, +91 90000 10001" />
          </dl>
        </div>

        <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
          <h3 className="font-display font-semibold text-ink mb-4">Live Updates</h3>
          <div className="space-y-4">
            {UPDATES.map((u, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">{u.time}</p>
                  <p className="text-sm text-ink">{u.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-ink font-medium text-right">{value}</dd>
    </div>
  );
}
