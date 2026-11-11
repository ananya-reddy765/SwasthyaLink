import React from "react";
import { Droplet, Milk, Wind, Ambulance, Pill, Stethoscope } from "lucide-react";

const ICONS = {
  blood_bank: Droplet,
  milk_bank: Milk,
  oxygen: Wind,
  ambulance: Ambulance,
  medicine: Pill,
  specialist: Stethoscope,
};

export default function ResourceCard({ type, label, value, onClick }) {
  const Icon = ICONS[type] || Droplet;
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-xl2 border border-slate-100 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all p-5 flex flex-col gap-3 w-full"
    >
      <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
        <Icon size={20} />
      </div>
      <div>
        <p className="font-display font-semibold text-ink">{label}</p>
        {value && <p className="text-sm text-slate-500 mt-0.5">{value}</p>}
      </div>
    </button>
  );
}
