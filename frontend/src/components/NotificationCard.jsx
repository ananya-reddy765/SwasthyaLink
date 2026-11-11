import React from "react";
import { Bell, AlertTriangle, Info } from "lucide-react";

const ICONS = {
  Requests: Bell,
  Alerts: AlertTriangle,
  System: Info,
};

export default function NotificationCard({ notification }) {
  const Icon = ICONS[notification.type] || Bell;
  return (
    <div className="flex gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-soft">
      <div className="w-9 h-9 shrink-0 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
        <Icon size={16} />
      </div>
      <div>
        <p className="font-medium text-ink text-sm">{notification.title}</p>
        <p className="text-sm text-slate-500">{notification.message}</p>
        <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
      </div>
    </div>
  );
}
