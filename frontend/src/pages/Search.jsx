import React, { useMemo, useState } from "react";
import { Search as SearchIcon, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import FacilityCard from "../components/FacilityCard.jsx";
import { RESOURCE_TYPES, facilities } from "../data/dummyData.js";

const URGENCY = ["Normal", "High", "Emergency"];

function matchScore(facility, urgency) {
  const availability = facility.availability?.toLowerCase().includes("high") ? 1 : 0.7;
  const distance = Math.max(0, 1 - facility.distanceKm / 30);
  const travel = Math.max(0, 1 - facility.travelMinutes / 60);
  const urgencyWeight = urgency === "Emergency" ? 1 : urgency === "High" ? 0.85 : 0.7;
  return (availability * 0.4 + distance * 0.3 + travel * 0.2 + urgencyWeight * 0.1) * 100;
}

export default function Search() {
  const [query, setQuery] = useState("2 units of O+ blood");
  const [resourceType, setResourceType] = useState("blood_bank");
  const [location, setLocation] = useState("Narayankhed PHC");
  const [urgency, setUrgency] = useState("Emergency");
  const [results, setResults] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const ranked = facilities
      .filter((f) => f.verified && f.resourceType === resourceType)
      .map((f) => ({ ...f, aiScore: Math.round(matchScore(f, urgency)) }))
      .sort((a, b) => b.aiScore - a.aiScore);

    setResults(ranked);
  };

  const selectedLabel = useMemo(
    () => RESOURCE_TYPES.find((r) => r.id === resourceType)?.label || "Resource",
    [resourceType]
  );

  return (
    <DashboardLayout title="Resource Search & Request" subtitle="Find the best verified facility for your patient">
      <form onSubmit={handleSearch} className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6 space-y-5 mb-8">
        <div>
          <label className="text-sm font-medium text-ink">What do you need?</label>
          <div className="relative mt-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 2 units of O+ blood"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-ink">Resource Type</label>
            <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300">
              {RESOURCE_TYPES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-ink">Location</label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input value={location} onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-ink">Urgency</label>
            <div className="flex gap-2 mt-1">
              {URGENCY.map((u) => (
                <button type="button" key={u} onClick={() => setUrgency(u)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    urgency === u
                      ? u === "Emergency" ? "bg-rose-500 border-rose-500 text-white"
                      : u === "High" ? "bg-amber-500 border-amber-500 text-white"
                      : "bg-brand-500 border-brand-500 text-white"
                      : "border-slate-200 text-slate-600 hover:bg-mist"
                  }`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors">
          Search Available Resources
        </button>
      </form>

      {results && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-semibold text-lg text-ink">
                Recommended {selectedLabel} Facilities
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                <Sparkles size={13} /> AI ranking: availability + distance + travel time + urgency
              </p>
            </div>
            <span className="badge bg-brand-50 text-brand-600">
              <ShieldCheck size={13} /> Verified only
            </span>
          </div>

          {results.length ? (
            <div className="grid md:grid-cols-2 gap-5">
              {results.map((f, i) => <FacilityCard key={f.id} facility={f} best={i === 0} />)}
            </div>
          ) : (
            <div className="bg-white rounded-xl2 border border-slate-100 p-8 text-center text-slate-500">
              No verified facility currently matches this resource type.
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
