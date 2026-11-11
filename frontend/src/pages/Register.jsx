import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, UploadCloud, CheckCircle2 } from "lucide-react";

const FACILITY_TYPES = ["Hospital", "PHC", "Blood Bank", "Milk Bank", "Pharmacy", "Diagnostic Centre", "Ambulance Service", "Other"];
const STEPS = ["Facility Details", "Verification", "Admin Approval"];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < STEPS.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-xl2 shadow-card border border-slate-100 w-full max-w-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg bg-brand-500 text-white flex items-center justify-center">
            <HeartPulse size={18} />
          </div>
          <span className="font-display font-bold text-ink">SwasthyaLink</span>
        </div>

        {/* Progress */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  i <= step ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs ${i <= step ? "text-brand-600 font-medium" : "text-slate-400"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-brand-500" : "bg-slate-100"}`} />}
            </React.Fragment>
          ))}
        </div>

        {submitted ? (
          <div className="text-center py-10">
            <CheckCircle2 className="text-brand-500 mx-auto mb-4" size={48} />
            <h2 className="font-display font-bold text-xl text-ink mb-2">Registration Submitted</h2>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              Your facility will not become active until an admin verifies your documents.
              You'll be notified once approved.
            </p>
            <Link to="/login" className="inline-block bg-brand-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-600 transition-colors">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleNext} className="space-y-4">
            {step === 0 && (
              <>
                <div>
                  <label className="text-sm font-medium text-ink">Facility Type</label>
                  <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300">
                    {FACILITY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Facility Name" placeholder="City Blood Bank" />
                  <Field label="Phone Number" placeholder="+91 90000 00000" />
                  <Field label="State" placeholder="Telangana" />
                  <Field label="District" placeholder="Sangareddy" />
                </div>
                <Field label="Address" placeholder="Street, Area, City" />
                <Field label="Email" placeholder="contact@facility.org" type="email" />
              </>
            )}

            {step === 1 && (
              <>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-brand-200 rounded-xl py-10 cursor-pointer hover:bg-brand-50/40 transition-colors">
                  <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
                  <UploadCloud className="text-brand-400" size={28} />
                  <p className="text-sm text-slate-500">{fileName || "Upload verification / license document"}</p>
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Authorized Person" placeholder="Full name" />
                  <Field label="Create Password" placeholder="••••••••" type="password" />
                </div>
              </>
            )}

            {step === 2 && (
              <div className="text-center py-8">
                <p className="text-slate-600 mb-2">Your details and documents will be reviewed by a SwasthyaLink admin.</p>
                <p className="text-sm text-slate-400">This usually takes 1–2 business days.</p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 0 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="px-5 py-2.5 rounded-lg border border-slate-200 text-ink font-medium hover:bg-mist">
                  Back
                </button>
              ) : <span />}
              <button type="submit" className="px-6 py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors">
                {step === STEPS.length - 1 ? "Submit Registration" : "Continue"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
      />
    </div>
  );
}
