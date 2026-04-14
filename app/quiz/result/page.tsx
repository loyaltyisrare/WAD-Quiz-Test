"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScreenFrame } from "@/components/brand/ScreenFrame";
import { ResultSummary } from "@/components/quiz/ResultSummary";
import { ShareActions } from "@/components/quiz/ShareActions";
import { getSessionState, resetSession } from "@/lib/quiz/storage";
import { scoreFromAnswers, getResultBand } from "@/lib/quiz/scoring";
import { QuizSessionState, QuizResultBand } from "@/lib/quiz/types";
import { motion } from "framer-motion";

export default function ResultPage() {
  const router = useRouter();
  const [state, setState] = useState<QuizSessionState | null>(null);
  const [score, setScore] = useState(0);
  const [band, setBand] = useState<QuizResultBand | null>(null);

  useEffect(() => {
    const session = getSessionState();
    if (Object.keys(session.answers || {}).length === 0) {
      router.push("/");
      return;
    }

    const calculatedScore = scoreFromAnswers(session.answers);
    const resultBand = getResultBand(calculatedScore);

    setState(session);
    setScore(calculatedScore);
    setBand(resultBand);
  }, [router]);

  if (!state || !band) return null;

  function handleRetake() {
    resetSession();
    router.push("/");
  }

  return (
    <ScreenFrame>
      <div className="space-y-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ResultSummary 
            firstName={state.lead?.firstName} 
            score={score} 
            band={band} 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ShareActions 
            shareText={`I just took the Women Are Drugs assessment and I am ${band.label}! Discover your profile here.`}
            score={score}
            bandLabel={band.label}
            bandColor={band.color}
            email={state.lead?.email}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleRetake}
            className="text-brand-muted text-[11px] uppercase tracking-[0.2em] hover:text-brand-accent transition-colors underline underline-offset-4"
          >
            Retake the assessment
          </button>
        </motion.div>
      </div>
    </ScreenFrame>
  );
}
