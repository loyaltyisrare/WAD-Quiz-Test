"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScreenFrame } from "@/components/brand/ScreenFrame";
import { setAdminAuthenticated } from "@/lib/admin/auth";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // In a real app, this would be a server-side check with a secure session
    // For this replication, we'll use the configured password
    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setAdminAuthenticated();
      router.push("/admin/dashboard");
    } else {
      setError("Unauthorized access denied.");
    }
  }

  return (
    <ScreenFrame showLogo={true}>
      <div className="max-w-sm mx-auto w-full px-6">
        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-[2rem] border-brand-accent/10 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-xs text-brand-accent/40 uppercase tracking-widest">Authorized Access Only</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="System Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-white/40 transition-colors outline-none"
            />
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-4 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Authenticate
          </button>
        </form>
      </div>
    </ScreenFrame>
  );
}
