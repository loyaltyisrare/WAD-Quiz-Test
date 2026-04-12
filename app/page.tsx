"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="relative w-48 h-16 md:w-64 md:h-20 mb-4 mx-auto">
          <Image
            src="/brand/logo/wad-logo.png"
            alt="Women Are Drugs"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-xl glass-card rounded-3xl p-8 md:p-12 border-brand-accent/10"
      >
        <span className="text-brand-red font-bold tracking-[0.2em] text-sm uppercase mb-4 block glow-text">
          D.R.U.G.S.
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
          What Are You Really Addicted To?
        </h1>
        <p className="text-muted text-lg mb-10 leading-relaxed text-lir-muted">
          Six quick questions to reveal whether you’re drawn to a woman’s depth, power, and rarity, or just the surface.
        </p>

        <Link href="/quiz/play">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#d6d3c1] text-[#090909] py-5 px-8 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-[#d6d3c1]/20 active:opacity-90"
          >
            Start the Test
          </motion.button>
        </Link>
      </motion.div>

      {/* Footer Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-16 w-32 h-12 relative opacity-50 grayscale hover:grayscale-0 transition-all cursor-default"
      >
        <Image
          src="/brand/footer logo/wad-meaningv2w.png"
          alt="Meaning"
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
