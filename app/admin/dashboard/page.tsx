"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { Users, Filter, Download, Trash2, Calendar, Hash } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={
      <AdminLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "analytics";
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/admin/leads");
        const data = await res.json();
        if (Array.isArray(data)) {
          setLeads(data);
        }
      } catch (err) {
        console.error("Failed to fetch leads", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const getPageTitle = () => {
    if (view === "analytics") return "System Overview";
    if (view === "leads") return "Lead Management";
    return "Dashboard";
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent/30 mb-2">Internal Report</p>
            <h1 className="text-5xl font-bold tracking-tight">{getPageTitle()}</h1>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent/40">Active Records</span>
              <span className="text-xl font-bold">{leads.length}</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : view === "analytics" ? (
          <AnalyticsDashboard leads={leads} />
        ) : (
          /* Leads Table */
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
                <button className="bg-[#d6d3c1] text-black px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-white/5">
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-brand-accent/40">User</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-brand-accent/40">Contact Info</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-brand-accent/40">Social</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-brand-accent/40 text-center">Score</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-brand-accent/40">Timestamp</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-brand-accent/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()).map((lead, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-white text-base">{lead.firstName || "Anonymous"}</div>
                        <div className="text-[10px] text-brand-accent/40 mt-0.5">{lead.gender}, {lead.age}y/o</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-brand-accent/70">{lead.email}</div>
                        <div className="text-[10px] text-brand-accent/40 mt-0.5">{lead.phone || "No phone"}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-brand-accent/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-50" />
                            {lead.socialHandle || "@private"}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-block px-3 py-1.5 rounded-lg bg-white/10 font-black tabular-nums border border-white/5">
                          {Math.round((lead.quizScore / 24) * 100)}%
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-brand-accent/40 text-xs">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.recordedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 rounded-lg text-white/20 hover:text-brand-red hover:bg-brand-red/5 transition-all opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                        <Users className="w-12 h-12 text-white/5 mx-auto mb-4" />
                        <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-xs">No active records found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
