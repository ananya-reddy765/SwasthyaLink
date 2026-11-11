import React from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="bg-white rounded-xl2 shadow-card max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-ink">
          <X size={18} />
        </button>
        {title && <h3 className="font-display font-semibold text-lg mb-4 text-ink">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
