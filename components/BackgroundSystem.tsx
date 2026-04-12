"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BACKGROUND_SVGS = [
  "/brand/svgs/betty.svg",
  "/brand/svgs/callwad.svg",
  "/brand/svgs/queen.svg",
  "/brand/svgs/sheready.svg",
  "/brand/svgs/shetied.svg",
  "/brand/svgs/sit.svg",
  "/brand/svgs/wadog.svg",
  "/brand/svgs/wass.svg",
];

export const BackgroundSystem = () => {
  const [currentSvg, setCurrentSvg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSvg((prev) => (prev + 1) % BACKGROUND_SVGS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#090909]">
      {/* Dynamic SVG Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSvg}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none"
        >
          {/* Using img tag because these SVGs are massive and complex */}
          <img 
            src={BACKGROUND_SVGS[currentSvg]} 
            alt="Background Motif" 
            className="w-full h-full object-contain filter grayscale invert"
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090909]/60 to-[#090909]" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
