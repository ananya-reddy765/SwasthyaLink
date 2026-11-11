import React, { useState } from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";

export default function UploadReceipt({ onSubmit }) {
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({ refId: "", receiptNo: "", date: "", remarks: "" });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...form, fileName });
    setForm({ refId: "", receiptNo: "", date: "", remarks: "" });
    setFileName("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6 space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-brand-200 rounded-xl py-8 cursor-pointer hover:bg-brand-50/40 transition-colors">
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFile} />
        {fileName ? <FileCheck2 className="text-brand-500" size={28} /> : <UploadCloud className="text-brand-400" size={28} />}
        <p className="text-sm text-slate-500">{fileName || "Click to upload receipt (PDF, JPG, PNG)"}</p>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink">Patient Reference ID</label>
          <input
            required
            value={form.refId}
            onChange={(e) => setForm({ ...form, refId: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="PT-8841"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Receipt Number</label>
          <input
            required
            value={form.receiptNo}
            onChange={(e) => setForm({ ...form, receiptNo: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="RCT-2201"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Date</label>
          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Remarks</label>
          <input
            value={form.remarks}
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="Optional note"
          />
        </div>
      </div>

      <button type="submit" className="w-full py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors">
        Upload Receipt
      </button>
    </form>
  );
}
