"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

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
  const [elements, setElements] = useState<{ id: number; left: string; top: string; size: number; duration: number; delay: number; rotate: number }[]>([]);

  useEffect(() => {
    // Ported exact LiR particle generation
    const generated = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90}%`,
      top: `${Math.random() * 90}%`,
      size: Math.random() * 20 + 20,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
      rotate: Math.random() * 45 - 22.5,
    }));
    setElements(generated);

    const interval = setInterval(() => {
      setCurrentSvg((prev) => (prev + 1) % BACKGROUND_SVGS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-brand-black">
      {/* Exact LiR Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
        {elements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute text-brand-red drop-shadow-[0_0_10px_rgba(243,57,57,0.3)]"
            style={{ left: el.left, top: el.top }}
            animate={{
              y: [0, -30, 0, 30, 0],
              x: [0, 10,  0, -10, 0],
              rotate: [el.rotate, el.rotate + 15, el.rotate - 15, el.rotate], 
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart size={el.size} fill="currentColor" strokeWidth={0} />
          </motion.div>
        ))}
      </div>

      {/* Dynamic SVG Layer (WAD Motif) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSvg}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none"
        >
          <img 
            src={BACKGROUND_SVGS[currentSvg]} 
            alt="Background Motif" 
            className="w-full h-full object-contain filter grayscale invert opacity-50"
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/60 to-brand-black" />
    </div>
  );
};
