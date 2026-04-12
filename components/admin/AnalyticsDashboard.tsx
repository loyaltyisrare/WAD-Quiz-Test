"use client";

import { useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Users, Target, Activity, Zap } from "lucide-react";

interface AnalyticsDashboardProps {
  leads: any[];
}

export function AnalyticsDashboard({ leads }: AnalyticsDashboardProps) {
  // Aggregate data for charts
  const stats = useMemo(() => {
    const total = leads.length;
    const avgScore = total > 0 
      ? leads.reduce((acc, l) => acc + (l.quizScore || 0), 0) / total 
      : 0;
    
    // Score distribution (0-24 pts)
    const scoreBins = [
      { name: "Low", count: 0, color: "#9ca3af" },
      { name: "Med", count: 0, color: "#60a5fa" },
      { name: "High", count: 0, color: "#f33939" },
    ];

    leads.forEach(l => {
      const s = l.quizScore || 0;
      if (s < 12) scoreBins[0].count++;
      else if (s < 18) scoreBins[1].count++;
      else scoreBins[2].count++;
    });

    // Gender distribution
    const genderData: any[] = [];
    const genders = leads.reduce((acc: any, l) => {
      const g = l.gender || "Other";
      acc[g] = (acc[g] || 0) + 1;
      return acc;
    }, {});

    Object.entries(genders).forEach(([name, value]) => {
      genderData.push({ name, value });
    });

    return { total, avgScore: Math.round((avgScore / 24) * 100), scoreBins, genderData };
  }, [leads]);

  const metricCards = [
    { label: "Total Captures", value: stats.total, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Avg Addiction", value: `${stats.avgScore}%`, icon: Target, color: "text-brand-red", bg: "bg-brand-red/10" },
    { label: "Completion Rate", value: "94%", icon: Activity, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Social Opt-in", value: "68%", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card) => (
          <div key={card.label} className="glass-card p-6 rounded-3xl border-white/5 bg-white/5">
            <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center mb-4`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-brand-accent/40 font-bold mb-1">{card.label}</p>
            <h3 className="text-3xl font-black tabular-nums">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Distribution */}
        <div className="glass-card p-8 rounded-3xl border-white/5 bg-white/5 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart className="w-5 h-5 opacity-40" /> Score Distribution
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.scoreBins}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#ffffff30", fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111", border: "1px solid #222", borderRadius: "12px", fontSize: "12px" }} 
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {stats.scoreBins.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Breakdown */}
        <div className="glass-card p-8 rounded-3xl border-white/5 bg-white/5 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 opacity-40" /> Identity Breakdown
          </h3>
          <div className="flex-grow relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {stats.genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#f33939", "#d6d3c1", "#333"][index % 3]} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: "#111", border: "1px solid #222", borderRadius: "12px", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black">{stats.total}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent/30">Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
