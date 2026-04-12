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
  const [[currentIndex, direction], setPage] = useState([0, 0]);
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
    // Initialize session
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
      
      // If we already have lead info (e.g. returning user), go to result
      if (state.lead) {
        router.push("/quiz/result");
        return;
      }

      // Otherwise go to lead capture
      router.push("/quiz/lead");
      return;
    }

    // Advance to next question
    setPage([currentIndex + 1, 1]);
    
    // Selection lockout (500ms)
    setTimeout(() => setIsTransitioning(false), 500);
  }

  function handleBack() {
    if (currentIndex > 0) {
      setPage([currentIndex - 1, -1]);
    } else {
      router.push("/");
    }
  }

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

  return (
    <ScreenFrame>
      <div className="mb-4 relative z-10">
        <ProgressBar current={currentIndex + 1} total={shuffledQuestions.length} />
      </div>
      
      <div className="relative overflow-hidden min-h-[450px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={`w-full ${isTransitioning ? "pointer-events-none" : ""}`}
          >
            <QuestionCard question={question} onSelect={handleSelect} disabled={isTransitioning} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={handleBack} 
          className="flex items-center gap-2 text-sm text-brand-accent/40 hover:text-white transition-colors py-2 px-4 rounded-full hover:bg-white/5"
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Previous
        </button>
      </div>
    </ScreenFrame>
  );
}
