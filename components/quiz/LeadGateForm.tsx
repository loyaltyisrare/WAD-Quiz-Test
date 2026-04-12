"use client";

import { useState } from "react";
import { leadSchema } from "@/lib/quiz/validation";
import { SessionLead } from "@/lib/quiz/types";

interface LeadGateFormProps {
  onSubmit: (lead: SessionLead) => void;
}

export function LeadGateForm({ onSubmit }: LeadGateFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d+]/g, '');
    
    // Simple US formatting for example
    if (!val.startsWith('+') && val.length <= 10) {
      const match = val.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        val = !match[2] ? match[1] : `(${match[1]}) ${match[2]}` + (match[3] ? `-${match[3]}` : '');
      }
    }
    setPhone(val);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload: SessionLead = {
      gender: String(formData.get("gender") ?? ""),
      age: String(formData.get("age") ?? ""),
      firstName: String(formData.get("firstName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      socialHandle: String(formData.get("socialHandle") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      consent: formData.get("consent") === "on"
    };

    const result = leadSchema.safeParse(payload);
    
    if (!result.success) {
      setErrors(result.error.errors.map((issue) => issue.message));
      return;
    }

    setErrors([]);
    onSubmit(result.data as SessionLead);
  }

  return (
    <form className="glass-card p-6 md:p-8 rounded-3xl space-y-5 border-brand-accent/10" onSubmit={handleSubmit} noValidate>
      <div className="text-center pb-2">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">Your result is ready.</h1>
        <p className="text-sm md:text-md text-brand-accent/60 mt-2 leading-relaxed">
          Enter your info to unlock your result and get access to future drops, exclusives, and special offers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 relative">
          <label className="text-[11px] uppercase tracking-widest text-brand-accent/40 pl-1">Experience</label>
          <div className="relative">
            <select name="gender" required className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white appearance-none" defaultValue="">
              <option value="" disabled>Status...</option>
              <option value="Woman">Woman</option>
              <option value="Man">Man</option>
              <option value="Other">Other</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-50">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-1 relative">
          <label className="text-[11px] uppercase tracking-widest text-brand-accent/40 pl-1">Age</label>
          <input name="age" type="number" required placeholder="Age" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/20" />
        </div>
      </div>

      <div className="space-y-1 relative">
        <label className="text-[11px] uppercase tracking-widest text-brand-accent/40 pl-1">Personal Details</label>
        <div className="space-y-3">
          <input name="firstName" placeholder="First Name" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/20" />
          <input name="email" type="email" placeholder="Email Address" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/20" />
          <input name="socialHandle" placeholder="Instagram @handle" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/20" />
          <input 
            name="phone" 
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Phone (Optional - Free gift 🎁)" 
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/20" 
          />
        </div>
      </div>

      <div className="pt-2">
        <label className="flex gap-3 text-xs text-brand-accent/50 items-start cursor-pointer group">
          <input type="checkbox" name="consent" defaultChecked className="mt-1 accent-brand-red w-4 h-4 rounded border-white/20 bg-black/40" />
          <span className="group-hover:text-brand-accent transition-colors">
            By submitting, you agree to receive follow-up messages, brand updates, and special offers.
          </span>
        </label>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
          <ul className="space-y-1 text-xs text-red-400">
            {errors.map((error) => (
              <li key={error} className="flex gap-2">
                <span className="opacity-50">•</span> {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-[#d6d3c1] text-[#090909] py-4 px-6 rounded-full font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#d6d3c1]/10 mt-2"
      >
        Reveal My Result
      </button>
    </form>
  );
}
