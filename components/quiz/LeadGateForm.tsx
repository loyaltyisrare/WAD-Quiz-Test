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
      setErrors(result.error.issues.map((issue) => issue.message));
      return;
    }

    setErrors([]);
    onSubmit(result.data as SessionLead);
  }

  return (
    <form className="panel space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="text-center pb-2">
        <h1 className="headline text-[28px] leading-tight">Before we reveal your score...</h1>
        <p className="text-[15px] leading-relaxed text-brand-muted mt-2">Drop your details to unlock your profile.</p>
      </div>

      <div className="space-y-1 relative">
        <label className="text-[13px] text-brand-muted pl-1">Helps us find out if these habits differ based on age, how old are you?</label>
        <div className="relative">
          <input name="age" type="number" required placeholder="Enter your age" className="w-full rounded-xl border border-brand-line bg-black/30 px-4 py-3 text-brand-text placeholder:text-brand-muted/70 pr-8" />
          <span className="absolute top-2 right-3 text-brand-red font-black text-xs leading-none">*</span>
        </div>
      </div>

      <div className="relative">
        <input name="firstName" required placeholder="First name" className="w-full rounded-xl border border-brand-line bg-black/30 px-4 py-3 text-brand-text placeholder:text-brand-muted/70 pr-8" />
        <span className="absolute top-2 right-3 text-brand-red font-black text-xs leading-none">*</span>
      </div>

      <div className="relative">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-brand-line bg-black/30 px-4 py-3 text-brand-text placeholder:text-brand-muted/70 pr-8" />
        <span className="absolute top-2 right-3 text-brand-red font-black text-xs leading-none">*</span>
      </div>

      <input
        name="socialHandle"
        placeholder="Instagram or social media handle"
        className="w-full rounded-xl border border-brand-line bg-black/30 px-4 py-3 text-brand-text placeholder:text-brand-muted/70"
      />

      <input 
        name="phone" 
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Phone number (Optional - Gift 🎁)" 
        className="w-full rounded-xl border border-brand-line bg-black/30 px-4 py-3 text-brand-text placeholder:text-brand-muted/70" 
      />

      <div className="flex justify-between items-center">
        <label className="flex gap-2 text-[13px] text-brand-muted items-center cursor-pointer">
          <input type="checkbox" name="consent" defaultChecked className="mt-0.5" />
          <span>I agree to the terms.</span>
        </label>
        <span className="text-[10px] text-brand-muted/60 flex items-center gap-1 uppercase tracking-tighter">
          <span className="text-brand-red font-black text-xs">*</span> Required fields
        </span>
      </div>

      {errors.length > 0 && (
        <ul className="space-y-1 text-xs text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
          {errors.map((error) => (
            <li key={error}>• {error}</li>
          ))}
        </ul>
      )}

      <button 
        type="submit"
        className="w-full h-12 bg-brand-accent text-brand-black text-base font-semibold rounded-xl hover:opacity-95 transition-all active:scale-[0.98]"
      >
        Reveal My Result
      </button>
    </form>
  );
}

