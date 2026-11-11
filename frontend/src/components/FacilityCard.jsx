import React from "react";
import { MapPin, Clock, ShieldCheck, Sparkles, Phone, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FacilityCard({ facility, best }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-5 flex flex-col gap-4 relative">
      {best && (
        <span className="absolute -top-3 left-5 badge bg-brand-500 text-white shadow-card">
          <Sparkles size={12} /> Best Match
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-lg text-ink">{facility.name}</h3>
          <p className="text-sm text-slate-500">{facility.type}</p>
        </div>
        {facility.verified && (
          <span className="badge bg-brand-50 text-brand-600">
            <ShieldCheck size={13} /> Verified
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
        <span className="flex items-center gap-1"><MapPin size={14} className="text-brand-500" /> {facility.distanceKm} km</span>
        <span className="flex items-center gap-1"><Clock size={14} className="text-brand-500" /> {facility.travelMinutes} min</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {facility.stock?.slice(0, 4).map((s, i) => (
          <span key={i} className="badge bg-mist text-ink border border-slate-100">
            {s.group}: {s.units}{facility.resourceType === "ambulance" ? "" : " units"}
          </span>
        ))}
      </div>

      <p className="text-sm font-medium text-brand-600">{facility.availability}</p>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        <a href={`tel:${facility.phone}`}
          className="flex-1 min-w-[100px] text-center py-2 rounded-lg border border-slate-200 text-sm font-medium text-ink hover:bg-mist flex items-center justify-center gap-1.5">
          <Phone size={14} /> Contact
        </a>
        <button onClick={() => navigate(`/facility/${facility.id}`)}
          className="flex-1 min-w-[100px] py-2 rounded-lg border border-slate-200 text-sm font-medium text-ink hover:bg-mist">
          View Details
        </button>
        <button onClick={() => navigate(`/requests/track/REQ-1050`)}
          className="flex-1 min-w-[110px] py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 flex items-center justify-center gap-1.5">
          <Send size={14} /> Send Request
        </button>
      </div>
    </div>
  );
}
