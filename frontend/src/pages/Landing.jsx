import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Phone, MessageSquare, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import ResourceCard from "../components/ResourceCard.jsx";
import MapPlaceholder from "../components/MapPlaceholder.jsx";
import { RESOURCE_TYPES } from "../data/dummyData.js";

export default function Landing() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge bg-brand-50 text-brand-600 mb-4">
            <ShieldCheck size={13} /> Verified Healthcare Facilities Only
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight">
            Strong Healthcare Together
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-lg">
            An AI-powered platform to help healthcare workers find and coordinate
            essential medical resources across hospitals, PHCs, blood banks,
            pharmacies and more — especially for rural and underserved areas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-600 transition-colors">
              Login <ArrowRight size={16} />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center gap-2 border border-slate-200 px-6 py-3 rounded-lg font-medium text-ink hover:bg-mist transition-colors">
              Learn More
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">SwasthyaLink — Connecting Healthcare. Saving Lives.</p>
        </div>
        <MapPlaceholder label="India Healthcare Network" height="h-80" />
      </section>

      {/* Resources */}
      <section id="resources" className="max-w-6xl mx-auto px-6 py-14 border-t border-slate-100">
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Resources coordinated on SwasthyaLink</h2>
        <p className="text-slate-500 mb-8 max-w-xl">Six essential resource categories, tracked in real time across verified facilities.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {RESOURCE_TYPES.map((r) => (
            <ResourceCard key={r.id} type={r.id} label={r.label} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-brand-50/50 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-ink mb-8">How coordination works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Search", desc: "A healthcare worker searches for a needed resource, like 2 units of O+ blood." },
              { title: "Match", desc: "AI ranks verified nearby facilities by availability, distance, travel time and urgency." },
              { title: "Coordinate", desc: "The worker contacts the best facility and sends a formal request." },
              { title: "Track", desc: "Both sides track the request live until the resource reaches the patient." },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-xl2 shadow-soft p-5 border border-slate-100">
                <p className="text-sm font-semibold text-brand-600 mb-2">Step {i + 1}</p>
                <h3 className="font-display font-semibold text-ink mb-1">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rural access channels */}
      <section id="rural-access" className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Rural Access Channels</h2>
        <p className="text-slate-500 mb-8 max-w-xl">
          For areas with limited internet access, healthcare workers can reach SwasthyaLink
          through two separate channels — no app or voice feature required inside the web application.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
            <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              <Phone size={20} />
            </div>
            <h3 className="font-display font-semibold text-ink mb-1">Phone Call</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Call our healthcare coordination helpline. An AI/IVR assistant understands
              your requirement, searches verified facilities, and reads back the best match
              during the call.
            </p>
          </div>
          <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
            <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              <MessageSquare size={20} />
            </div>
            <h3 className="font-display font-semibold text-ink mb-1">SMS</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Send resource, quantity and location as a text — e.g. "BLOOD O+ 2 PHC
              NARAYANKHED" — and receive facility, distance, stock and contact details by SMS.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-400">
        SwasthyaLink · Built for Smart India Hackathon · Connecting Healthcare. Saving Lives.
      </footer>
    </div>
  );
}
