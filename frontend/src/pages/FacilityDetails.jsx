import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, MapPin, Clock, Phone } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import MapPlaceholder from "../components/MapPlaceholder.jsx";
import { facilities } from "../data/dummyData.js";

export default function FacilityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const facility = facilities.find((f) => f.id === id) || facilities[0];

  return (
    <DashboardLayout title="Facility Details" subtitle={facility.name}>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-ink">{facility.name}</h2>
                <p className="text-slate-500">{facility.type}</p>
              </div>
              {facility.verified && (
                <span className="badge bg-brand-50 text-brand-600"><ShieldCheck size={13} /> Verified</span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
              <p className="flex items-center gap-2 text-slate-600"><MapPin size={15} className="text-brand-500" /> {facility.distanceKm} km away</p>
              <p className="flex items-center gap-2 text-slate-600"><Clock size={15} className="text-brand-500" /> {facility.travelMinutes} minutes travel</p>
              <p className="flex items-center gap-2 text-slate-600"><Phone size={15} className="text-brand-500" /> {facility.phone}</p>
              <p className="text-slate-600">Operating Hours: {facility.hours}</p>
            </div>

            <p className="text-sm text-slate-500 mb-2">{facility.address}</p>

            <h3 className="font-display font-semibold text-ink mt-6 mb-3">Resource Availability</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {facility.stock.map((s, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg bg-mist">
                  <span className="text-sm font-medium text-ink">{s.group}</span>
                  <span className="text-sm text-brand-600 font-semibold">{s.units} units</span>
                </div>
              ))}
            </div>
          </div>

          {facility.donors && (
            <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
              <h3 className="font-display font-semibold text-ink mb-3">Available Donors</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-500 text-left">
                    <tr><th className="py-2 font-medium">Name</th><th className="py-2 font-medium">Group</th><th className="py-2 font-medium">Last Donation</th></tr>
                  </thead>
                  <tbody>
                    {facility.donors.filter((d) => d.eligible).map((d, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="py-2 text-ink">{d.name}</td>
                        <td className="py-2">{d.group}</td>
                        <td className="py-2 text-slate-500">{d.lastDonation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <MapPlaceholder label={facility.name} />
          <a href={`tel:${facility.phone}`} className="block w-full text-center py-3 rounded-lg border border-slate-200 font-medium text-ink hover:bg-mist">
            Call Facility
          </a>
          <button
            onClick={() => navigate("/requests/track/REQ-1050")}
            className="block w-full text-center py-3 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600"
          >
            Send Request
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
