import { QuizResultBand } from "@/lib/quiz/types";
import { motion } from "framer-motion";

interface ResultSummaryProps {
  firstName?: string;
  score: number;
  band: QuizResultBand;
  maxScore?: number;
}

export function ResultSummary({ firstName, score, band, maxScore = 24 }: ResultSummaryProps) {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <section className="glass-card p-8 md:p-12 rounded-[2.5rem] text-center space-y-6 border-brand-accent/5 relative overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-10 blur-[100px] pointer-events-none"
        style={{ backgroundColor: band.color }}
      />
      
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent/40">Your Personality Profile</p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          {firstName ? `${firstName}, you are` : "You are"} <br/>
          <span style={{ color: band.color }} className="glow-text">{band.label}</span>
        </h1>
      </motion.div>
      
      <div 
        className="inline-flex flex-col items-center justify-center p-8 rounded-full border-2 bg-black/40 aspect-square min-w-[160px]"
        style={{ borderColor: `${band.color}33` }}
      >
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl font-black tracking-tighter"
          style={{ color: band.color }}
        >
          {percentage}%
        </motion.p>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">Match</p>
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-lg md:text-xl leading-relaxed text-brand-accent/70 max-w-md mx-auto"
      >
        {band.tagline}
      </motion.p>
    </section>
  );
}
