import React from "react";

const STYLES = {
  Pending: "bg-amber-50 text-amber-700",
  Accepted: "bg-brand-100 text-brand-700",
  "In Progress": "bg-blue-50 text-blue-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-rose-50 text-rose-700",
  Verified: "bg-emerald-50 text-emerald-700",
  Approved: "bg-emerald-50 text-emerald-700",
  Emergency: "bg-rose-50 text-rose-700",
  High: "bg-rose-50 text-rose-700",
  Moderate: "bg-amber-50 text-amber-700",
  Low: "bg-brand-100 text-brand-700",
  Normal: "bg-brand-100 text-brand-700",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || "bg-slate-100 text-slate-600";
  return <span className={`badge ${style}`}>{status}</span>;
}
