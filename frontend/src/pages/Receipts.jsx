import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import UploadReceipt from "../components/UploadReceipt.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { receipts as initialReceipts } from "../data/dummyData.js";

export default function Receipts() {
  const [receipts, setReceipts] = useState(initialReceipts);

  const handleUpload = (form) => {
    setReceipts([
      { id: form.receiptNo || `RCT-${Math.floor(Math.random() * 9000 + 1000)}`, date: form.date, facility: "Your Facility", refId: form.refId, status: "Pending" },
      ...receipts,
    ]);
  };

  return (
    <DashboardLayout title="Hospital Receipts" subtitle="Upload and track coordination documents — not full patient medical records">
      <div className="grid md:grid-cols-2 gap-6">
        <UploadReceipt onSubmit={handleUpload} />

        <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-mist text-slate-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Receipt ID</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Reference ID</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">View</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((r, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-ink font-medium">{r.id}</td>
                  <td className="px-4 py-3 text-slate-500">{r.date}</td>
                  <td className="px-4 py-3 text-slate-500">{r.refId}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3"><button className="text-brand-600 hover:underline">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
