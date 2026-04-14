"use client";

import Link from "next/link";
import { ScreenFrame } from "@/components/brand/ScreenFrame";
import { Footer } from "@/components/brand/Footer";

export default function LandingPage() {
  return (
    <ScreenFrame>
      <section className="panel space-y-5 text-center px-4 py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">THE REAL ADDICTION TEST</p>
        <h1 className="headline text-[32px] leading-tight">
          What are you really<br />addicted to?
        </h1>
        <p className="text-[15px] leading-relaxed text-brand-muted pt-2 pb-4">
          Takes about 60 seconds. Find out what draws you in about women. Your result unlocks at the end.
        </p>
        <Link href="/quiz/play" className="block">
          <button className="w-full h-12 bg-brand-accent text-brand-black text-base font-semibold rounded-xl hover:opacity-95 transition-all active:scale-[0.98]">
            Start the Test
          </button>
        </Link>
      </section>
      
      <Footer />
    </ScreenFrame>
  );
}
