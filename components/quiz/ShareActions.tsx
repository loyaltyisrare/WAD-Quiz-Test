"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface ShareActionsProps {
  shareText: string;
  score: number;
  bandLabel: string;
  bandColor: string;
  email?: string;
}

export function ShareActions({ shareText, score, bandLabel, bandColor, email }: ShareActionsProps) {
  const [message, setMessage] = useState<string>("");

  // OG image URL for story format
  const ogUrl = `/api/og/story?score=${score}&band=${encodeURIComponent(bandLabel)}&color=${encodeURIComponent(bandColor)}`;

  const filenameSuffix = useMemo(() => {
    if (email) {
      return email.split('@')[0];
    }
    return Math.floor(100 + Math.random() * 900).toString();
  }, [email]);

  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && !navigator.share) {
      setMessage("Native share is not available. Please save the image directly.");
      return;
    }

    try {
      await navigator.share({ 
        title: "Women Are Drugs | Quiz Result", 
        text: shareText, 
        url: window.location.origin 
      });
      setMessage("Shared.");
    } catch(err) {
       // user likely aborted
    }
  }

  return (
    <div className="glass-card p-6 md:p-10 rounded-[2.5rem] space-y-6 border-brand-accent/5">
      <div className="text-center space-y-2">
        <h2 className="text-xl md:text-2xl font-bold">Share your Addiction</h2>
        <p className="text-sm text-brand-accent/50 max-w-xs mx-auto">
          Long press the image below to save it to your camera roll, or use the download button.
        </p>
      </div>
      
      {/* 9:16 format wrapper to emulate IG Story format */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="w-full max-w-[240px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl relative group"
      >
        <img 
          src={ogUrl} 
          alt="Your Result" 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      <div className="flex flex-col gap-4 pt-4">
        <a 
          href={ogUrl} 
          download={`wad-result-${filenameSuffix}.png`}
          className="flex items-center justify-center w-full bg-white text-black font-bold py-4 px-6 rounded-full shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Download Story
        </a>
        <button 
          onClick={handleNativeShare} 
          className="w-full border border-white/10 bg-white/5 text-white/80 font-bold py-4 px-6 rounded-full transition-all hover:bg-white/10 hover:text-white"
        >
          Share Direct Link
        </button>
      </div>
      
      {message && <p className="text-xs text-brand-accent/40 text-center animate-pulse">{message}</p>}
    </div>
  );
}
