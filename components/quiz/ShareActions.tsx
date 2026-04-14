"use client";

import { useState, useMemo } from "react";

interface ShareActionsProps {
  shareText: string;
  score: number;
  bandLabel: string;
  bandColor: string;
  email?: string;
}

export function ShareActions({ shareText, score, bandLabel, bandColor, email }: ShareActionsProps) {
  const [message, setMessage] = useState<string>("");

  const ogUrl = `/api/og/story?score=${score}&band=${encodeURIComponent(bandLabel)}&color=${encodeURIComponent(bandColor)}`;

  const filenameSuffix = useMemo(() => {
    if (email) {
      return email.split('@')[0];
    }
    return Math.floor(100 + Math.random() * 900).toString();
  }, [email]);

  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && !navigator.share) {
      setMessage("Native share not supported on this device.");
      return;
    }

    try {
      await navigator.share({ 
        title: "Women Are Drugs | Quiz Result", 
        text: shareText, 
        url: window.location.origin 
      });
      setMessage("Shared successfully.");
    } catch(err) {
       // user likely aborted
    }
  }

  return (
    <div className="panel space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-brand-text">Share your Profile</h2>
        <p className="text-[13px] text-brand-muted max-w-[280px] mx-auto leading-relaxed">
          Hold the image to save, or use the quick buttons below.
        </p>
      </div>
      
      <div className="w-full max-w-[220px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden border border-brand-line bg-black shadow-2xl relative group">
        <img 
          src={ogUrl} 
          alt="Your Result" 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <a 
          href={ogUrl} 
          download={`wad-result-${filenameSuffix}.png`}
          className="flex items-center justify-center w-full h-12 bg-white text-black text-sm font-bold rounded-xl transition-all hover:bg-white/90 active:scale-[0.98]"
        >
          Download Story
        </a>
        <button 
          onClick={handleNativeShare} 
          className="w-full h-12 border border-brand-line bg-white/5 text-brand-text text-sm font-bold rounded-xl transition-all hover:bg-white/10"
        >
          Share Direct Link
        </button>
      </div>
      
      {message && <p className="text-[11px] text-brand-accent/60 text-center uppercase tracking-widest">{message}</p>}
    </div>
  );
}
