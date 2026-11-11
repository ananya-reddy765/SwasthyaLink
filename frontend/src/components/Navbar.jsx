import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-100 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center">
            <HeartPulse size={17} />
          </div>
          <span className="font-display font-bold text-lg text-ink">SwasthyaLink</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#resources" className="hover:text-brand-600">Resources</a>
          <a href="#how-it-works" className="hover:text-brand-600">How It Works</a>
          <a href="#rural-access" className="hover:text-brand-600">Rural Access Channels</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-brand-600 hover:text-brand-700">Login</Link>
          <Link to="/register" className="text-sm font-medium bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
            Register Facility
          </Link>
        </div>
      </div>
    </header>
  );
}
