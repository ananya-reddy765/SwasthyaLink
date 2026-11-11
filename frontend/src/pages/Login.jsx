import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { FACILITY_TYPES } from "../context/AuthContext.jsx";

export default function Login() {
  const { loginMock } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [facilityType, setFacilityType] = useState("hospital");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = loginMock({ facilityType, identifier });
    navigate(user.isAdmin ? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-4">
      <div className="bg-white rounded-xl2 shadow-card border border-slate-100 w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-3">
            <HeartPulse size={22} />
          </div>
          <h1 className="font-display font-bold text-xl text-ink">Welcome Back</h1>
          <p className="text-sm text-slate-500">Login to your facility account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-ink">Login as</label>
            <select
              value={facilityType}
              onChange={(e) => setFacilityType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
            >
              {FACILITY_TYPES.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">
              This determines your dashboard view — e.g. Blood Bank staff see donor records.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-ink">Email / Mobile Number</label>
            <input
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@facility.org or 9XXXXXXXXX"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>

          <button type="submit" className="w-full py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors">
            Login
          </button>
          <button type="button" onClick={handleSubmit} className="w-full py-2.5 rounded-lg border border-slate-200 text-ink font-medium hover:bg-mist transition-colors">
            Login with OTP
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <a href="#" className="text-brand-600 hover:underline">Forgot Password?</a>
          <p className="text-slate-500">
            New Facility?{" "}
            <Link to="/register" className="text-brand-600 font-medium hover:underline">
              Request Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
