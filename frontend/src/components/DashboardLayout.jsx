import React from "react";
import { Bell, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function DashboardLayout({ title, subtitle, children }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-mist">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h1 className="font-display font-semibold text-lg text-ink leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/notifications" className="relative text-slate-500 hover:text-brand-600">
              <Bell size={19} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
            </Link>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-ink leading-tight">{user?.facilityName || "Facility"}</p>
              <p className="text-xs text-slate-500">{user?.facilityType || "Healthcare Facility"}</p>
            </div>
            <span className="badge bg-brand-50 text-brand-600">
              <ShieldCheck size={12} /> Verified
            </span>
          </div>
        </header>
        <main className="p-6 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
