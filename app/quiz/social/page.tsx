"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ScreenFrame } from "@/components/brand/ScreenFrame";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { socialQuizConfig } from "@/content/socialQuiz";
import { quizConfig } from "@/content/quiz.config";
import { AnimatePresence, motion } from "framer-motion";
import { Settings2, Play } from "lucide-react";

export default function SocialQuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<"setup" | "quiz">("setup");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetPercentage, setTargetPercentage] = useState(100);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Derive the current band for preview
  const currentBand = useMemo(() => {
    // Map 0-100% to 6-24 pts scale (mimicking the point range in quiz.config)
    const normalizedScore = Math.max(6, Math.min(24, Math.round((targetPercentage / 100) * 18) + 6));
    const found = quizConfig.resultBands.find((band) => normalizedScore >= band.min && normalizedScore <= band.max);
    return found || quizConfig.resultBands[quizConfig.resultBands.length - 1];
  }, [targetPercentage]);

  const questions = socialQuizConfig.questions;
  const question = questions[currentIndex];

  const handleSelect = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
      // Brief lockout to prevent double-selection
      setTimeout(() => setIsTransitioning(false), 500);
    } else {
      router.push(`/quiz/social/result/${targetPercentage}`);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  if (step === "setup") {
    return (
      <ScreenFrame>
        <div className="space-y-8 p-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-2 border border-white/10 shadow-xl">
              <Settings2 className="w-8 h-8 text-brand-red" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Story Controller</h1>
            <p className="text-sm text-brand-accent/50 max-w-[280px] mx-auto">
              Master control for content creators. Choose your outcome before filming.
            </p>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] bg-black/40 border-white/10 space-y-10 shadow-2xl relative overflow-hidden">
             {/* Preview Glow */}
             <div 
              className="absolute inset-0 opacity-10 blur-[80px] pointer-events-none"
              style={{ backgroundColor: currentBand.color }}
            />

            {/* Live Preview Card */}
            <div 
              className="p-8 rounded-3xl border-2 bg-black/60 text-center space-y-3 transition-all duration-500 relative z-10"
              style={{ borderColor: `${currentBand.color}44` }}
            >
              <div className="text-[10px] uppercase tracking-[0.3em] font-black" style={{ color: currentBand.color }}>
                {currentBand.label}
              </div>
              <div className="text-6xl font-black italic tracking-tighter" style={{ color: currentBand.color }}>
                {targetPercentage}%
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-5 px-2">
              <div className="flex justify-between text-[11px] uppercase font-bold text-brand-accent/40 tracking-widest px-1">
                <span>Outcome Bias</span>
                <span className="text-white">{targetPercentage}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                step="5"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            <button 
              onClick={() => setStep("quiz")} 
              className="w-full h-16 bg-white text-black rounded-full font-bold text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
            >
              <Play className="w-6 h-6 fill-current" />
              Begin Shoot
            </button>
          </div>

          <p className="text-[10px] text-center text-brand-accent/30 uppercase tracking-[0.4em] font-bold">
            INTERNAL USE ONLY &bull; RECORDING MODE
          </p>
        </div>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame>
      <div className="mb-4 relative z-10 font-bold px-4">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full px-4"
          >
            <div className="space-y-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight">
                {question.prompt}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {question.answers.map((answer, i) => (
                  <button
                    key={i}
                    onClick={handleSelect}
                    disabled={isTransitioning}
                    className={`w-full text-left p-6 rounded-2xl glass-card transition-all group relative overflow-hidden ${
                      isTransitioning ? "opacity-50 cursor-not-allowed" : "hover:border-white/40"
                    }`}
                  >
                    <span className="relative z-10 text-lg font-medium text-brand-accent/70 group-hover:text-white transition-colors">
                      {answer.text}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-16 text-center text-[11px] text-brand-red uppercase tracking-[0.5em] font-black animate-pulse">
        RECORDING IN PROGRESS
      </div>
    </ScreenFrame>
  );
}
