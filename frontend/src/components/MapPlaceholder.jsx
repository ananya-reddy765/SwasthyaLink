import React from "react";
import { MapPin } from "lucide-react";

export default function MapPlaceholder({ label = "Facility location", height = "h-56" }) {
  return (
    <div className={`w-full ${height} rounded-xl2 bg-brand-50 border border-brand-100 relative overflow-hidden flex items-center justify-center`}>
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M0 150 Q100 100 200 140 T400 120" stroke="#0d9488" strokeWidth="2" fill="none" />
        <path d="M0 60 Q120 90 220 50 T400 70" stroke="#0d9488" strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>
      <div className="flex flex-col items-center gap-1 z-10">
        <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-card">
          <MapPin size={18} />
        </div>
        <p className="text-sm font-medium text-brand-700">{label}</p>
        <p className="text-xs text-brand-500">Live map integration coming soon</p>
      </div>
    </div>
  );
}
