"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Send, Clock, Mail, CheckCircle2, AlertCircle, Play } from "lucide-react";

export default function BroadcastPage() {
  const [subject, setSubject] = useState("Your Women Are Drugs Result...");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });

      if (res.ok) {
        setStatus("success");
        setContent("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8 animate-in fade-in duration-700">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent/30 mb-2">Communications</p>
          <h1 className="text-5xl font-bold tracking-tight">Broadcast Center</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Composer */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSend} className="glass-card p-8 rounded-3xl border-white/5 bg-white/5 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-accent/40 ml-1">Email Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-white/20 transition-colors outline-none font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-accent/40 ml-1">Message Body (Markdown Supported)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Draft your re-marketing sequence here..."
                  className="w-full h-80 bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-white focus:border-white/20 transition-colors outline-none resize-none font-mono text-sm leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-4 items-center">
                    {status === "success" && (
                        <span className="flex items-center gap-2 text-green-400 text-xs font-bold animate-in fade-in zoom-in">
                            <CheckCircle2 className="w-4 h-4" /> Message sent successfully
                        </span>
                    )}
                    {status === "error" && (
                        <span className="flex items-center gap-2 text-red-400 text-xs font-bold">
                            <AlertCircle className="w-4 h-4" /> Failed to dispatch
                        </span>
                    )}
                </div>
                
                <button
                  type="submit"
                  disabled={sending || !content}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all ${
                    sending || !content 
                        ? "bg-white/5 text-white/20 cursor-not-allowed" 
                        : "bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-white/5"
                  }`}
                >
                  {sending ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  Dispatch Broadcast
                </button>
              </div>
            </form>
          </div>

          {/* Stats & Tips */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border-white/5 bg-white/5 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-brand-accent/80 flex items-center gap-2">
                <Clock className="w-4 h-4 opacity-40" /> Scheduled Tasks
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <Mail className="w-5 h-5 text-brand-red opacity-50 mt-1" />
                    <div>
                        <p className="text-xs font-bold">Abandoned Quiz Follow-up</p>
                        <p className="text-[10px] text-brand-accent/40 uppercase mt-1">Status: Active &bull; 2h Delay</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 opacity-50">
                    <Mail className="w-5 h-5 text-brand-accent opacity-50 mt-1" />
                    <div>
                        <p className="text-xs font-bold">Resend Sequence (Day 3)</p>
                        <p className="text-[10px] text-brand-accent/40 uppercase mt-1">Status: Paused</p>
                    </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] bg-brand-red/10 border border-brand-red/20 space-y-4">
               <h3 className="text-sm font-bold text-brand-red uppercase tracking-widest leading-tight">Pro Tip</h3>
               <p className="text-sm text-brand-red/70 leading-relaxed">
                 Use the <strong>[FirstName]</strong> tag to personalize your messages. Personalized subjects see a 24% higher open rate on average.
               </p>
               <button className="text-[10px] font-black tracking-widest uppercase flex items-center gap-2 text-brand-red hover:underline">
                 View Analytics <Play className="w-2 h-2 fill-current" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
