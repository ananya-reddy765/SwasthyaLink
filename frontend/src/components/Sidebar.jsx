import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Search, ClipboardList, Bell, Receipt, BarChart3,
  User, Settings, LogOut, HeartPulse, ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const FACILITY_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/search", label: "Resource Search", icon: Search },
  { to: "/requests/track/REQ-1042", label: "Requests", icon: ClipboardList },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/receipts", label: "Hospital Receipts", icon: Receipt },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

const ADMIN_LINKS = [
  { to: "/admin", label: "Admin Dashboard", icon: ShieldCheck },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user?.isAdmin ? ADMIN_LINKS : FACILITY_LINKS;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-100 flex flex-col">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center">
          <HeartPulse size={17} />
        </div>
        <span className="font-display font-bold text-ink">SwasthyaLink</span>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-mist"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
