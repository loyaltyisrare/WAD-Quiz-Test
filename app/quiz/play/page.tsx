"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ScreenFrame } from "@/components/brand/ScreenFrame";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { quizConfig } from "@/content/quiz.config";
import { AnswerKey } from "@/lib/quiz/types";
import { getSessionState, markQuizCompleted, saveAnswer } from "@/lib/quiz/storage";
import { AnimatePresence, motion } from "framer-motion";
import { shuffleArray } from "@/lib/utils/array";

export default function QuizPlayPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Shuffle answers for each question once per session
  const shuffledQuestions = useMemo(() => {
    return quizConfig.questions.map(q => ({
      ...q,
      answers: shuffleArray(q.answers)
    }));
  }, []);

  const question = useMemo(() => shuffledQuestions[currentIndex], [shuffledQuestions, currentIndex]);

  useEffect(() => {
    getSessionState();
  }, []);

  function handleSelect(answerKey: AnswerKey) {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentQuestion = shuffledQuestions[currentIndex];
    saveAnswer(currentQuestion.id, answerKey);

    const isLast = currentIndex === shuffledQuestions.length - 1;
    if (isLast) {
      markQuizCompleted();
      const state = getSessionState();
      
      if (state.lead) {
        router.push("/quiz/result");
        return;
      }
      router.push("/quiz/lead");
      return;
    }

    // Small delay for selection state feedback before transition
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsTransitioning(false);
    }, 400);
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      router.push("/");
    }
  }

  return (
    <ScreenFrame>
      <ProgressBar current={currentIndex + 1} total={shuffledQuestions.length} />
      
      <div className="relative min-h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`w-full ${isTransitioning ? "pointer-events-none" : ""}`}
          >
            <QuestionCard question={question} onSelect={handleSelect} disabled={isTransitioning} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={handleBack} 
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-brand-muted hover:text-brand-accent transition-colors py-2 px-4"
          aria-label="Go back"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Previous
        </button>
      </div>
    </ScreenFrame>
  );
}
