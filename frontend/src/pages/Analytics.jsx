import React from "react";
import { Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import DashboardLayout from "../components/DashboardLayout.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { demandPrediction, usageTrend, resourceOverview } from "../data/dummyData.js";

export default function Analytics() {
  return (
    <DashboardLayout title="Analytics" subtitle="Resource availability, demand prediction and usage trends">
      {/* AI Insight */}
      <div className="bg-brand-500 text-white rounded-xl2 p-6 mb-8 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="font-display font-semibold mb-1">AI Insight</p>
          <p className="text-sm text-brand-50 leading-relaxed">
            Based on recent trends, your region may require more O+ blood and oxygen in the
            coming days. Consider early coordination with nearby healthcare facilities.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Demand prediction */}
        <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
          <h3 className="font-display font-semibold text-ink mb-4">Demand Prediction</h3>
          <div className="space-y-3">
            {demandPrediction.map((d) => (
              <div key={d.resource} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                <span className="text-sm text-ink font-medium">{d.resource}</span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={d.level} />
                  <span className="text-sm font-semibold text-brand-600">{d.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource availability bar chart */}
        <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
          <h3 className="font-display font-semibold text-ink mb-4">Resource Availability</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={resourceOverview.map((r) => ({ name: r.label, value: parseInt(r.value) || 0 }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f1" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#0d9488" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Usage trend */}
      <div className="bg-white rounded-xl2 border border-slate-100 shadow-soft p-6">
        <h3 className="font-display font-semibold text-ink mb-4">Usage Trends (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={usageTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f1" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="blood" name="Blood" stroke="#0d9488" strokeWidth={2} />
            <Line type="monotone" dataKey="oxygen" name="Oxygen" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="medicine" name="Medicine" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
