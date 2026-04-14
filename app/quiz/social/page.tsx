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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Derive the current band for preview
  const currentBand = useMemo(() => {
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
      // Small feedback delay
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 400);
    } else {
      router.push(`/quiz/social/result/${targetPercentage}`);
    }
  };

  if (step === "setup") {
    return (
      <ScreenFrame>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-black/40 rounded-2xl flex items-center justify-center mx-auto mb-1 border border-brand-line">
              <Settings2 className="w-6 h-6 text-brand-accent/60" />
            </div>
            <h1 className="headline text-2xl">Story Controller</h1>
            <p className="subtle max-w-[260px] mx-auto">
              Choose your outcome bias before filming your content.
            </p>
          </div>

          <div className="panel space-y-8 relative overflow-hidden">
             {/* Preview Glow */}
             <div 
              className="absolute inset-0 opacity-10 blur-[60px] pointer-events-none"
              style={{ backgroundColor: currentBand.color }}
            />

            {/* Live Preview Card */}
            <div 
              className="p-6 rounded-2xl border-2 bg-black/40 text-center space-y-1 relative z-10 transition-colors"
              style={{ borderColor: `${currentBand.color}33` }}
            >
              <div className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: currentBand.color }}>
                {currentBand.label}
              </div>
              <div className="text-6xl font-black tracking-tighter" style={{ color: currentBand.color }}>
                {targetPercentage}%
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-4 px-1">
              <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-brand-muted">
                <span>Outcome Bias</span>
                <span className="text-brand-accent">{targetPercentage}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                step="5"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(parseInt(e.target.value))}
                className="w-full h-1 bg-brand-line/50 rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
            </div>

            <button 
              onClick={() => setStep("quiz")} 
              className="w-full h-14 bg-brand-accent text-brand-black rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              Begin Shoot
            </button>
          </div>

          <p className="text-[10px] text-center text-brand-muted uppercase tracking-[0.4em]">
            Internal Recording Mode
          </p>
        </div>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame>
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <div className="relative min-h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`w-full ${isTransitioning ? "pointer-events-none" : ""}`}
          >
            <div className="panel space-y-6">
               <p className="text-lg leading-snug text-brand-text">{question.prompt}</p>
               <div className="space-y-3">
                 {question.answers.map((answer, i) => (
                   <button
                     key={i}
                     onClick={handleSelect}
                     disabled={isTransitioning}
                     className="w-full rounded-xl border border-brand-line bg-black/35 px-4 py-4 text-left text-sm text-brand-text transition hover:border-brand-accent hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed group"
                     type="button"
                   >
                     <span className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-brand-muted group-hover:text-brand-accent transition-colors">
                       Option {["A", "B", "C", "D"][i]}
                     </span>
                     <span className="block leading-relaxed">{answer.text}</span>
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 text-center text-[11px] text-brand-red uppercase tracking-[0.5em] font-bold animate-pulse">
        Recording in Progress
      </div>
    </ScreenFrame>
  );
}
