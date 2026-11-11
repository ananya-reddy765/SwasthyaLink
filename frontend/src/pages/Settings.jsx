import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const LANGUAGES = ["English", "Hindi", "Telugu"];

export default function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("English");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences">
      <div className="max-w-xl space-y-6">
        <Section title="Notifications">
          <Toggle label="Email notifications" checked={notifyEmail} onChange={setNotifyEmail} />
          <Toggle label="SMS notifications" checked={notifySms} onChange={setNotifySms} />
        </Section>

        <Section title="Language">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
          </select>
        </Section>

        <Section title="Security">
          <button className="w-full text-left px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-ink hover:bg-mist">Change Password</button>
          <button className="w-full text-left px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-ink hover:bg-mist mt-2">Two-Factor Authentication</button>
        </Section>

        <Section title="Account">
          <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 rounded-lg border border-rose-200 text-sm text-rose-600 hover:bg-rose-50">Logout</button>
        </Section>
      </div>
    </DashboardLayout>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
      <h3 className="font-display font-semibold text-ink mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer">
      <span className="text-sm text-ink">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full relative transition-colors ${checked ? "bg-brand-500" : "bg-slate-200"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}
