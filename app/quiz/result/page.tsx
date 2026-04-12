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
      <div className="px-4 space-y-8 max-w-lg mx-auto pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResultSummary 
            firstName={state.lead?.firstName} 
            score={score} 
            band={band} 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <ShareActions 
            shareText={`I just took the Women Are Drugs addiction test and I am ${band.label}! Find out what you're addicted to.`}
            score={score}
            bandLabel={band.label}
            bandColor={band.color}
            email={state.lead?.email}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <button
            onClick={handleRetake}
            className="text-brand-accent/40 text-sm hover:text-white transition-colors underline underline-offset-4"
          >
            Retake the addiction test
          </button>
        </motion.div>
      </div>
    </ScreenFrame>
  );
}
