import React from "react";
import StatusBadge from "./StatusBadge.jsx";

export default function RequestCard({ request }) {
  return (
    <div className="flex items-center justify-between bg-white border border-slate-100 rounded-xl p-4 shadow-soft">
      <div>
        <p className="font-semibold text-ink text-sm">{request.id}</p>
        <p className="text-sm text-slate-500">{request.resource}</p>
        <p className="text-xs text-slate-400 mt-1">{request.requestedBy} · {request.time}</p>
      </div>
      <StatusBadge status={request.status} />
    </div>
  );
}
