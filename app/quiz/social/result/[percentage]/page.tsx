"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ScreenFrame } from "@/components/brand/ScreenFrame";
import { ResultSummary } from "@/components/quiz/ResultSummary";
import { ShareActions } from "@/components/quiz/ShareActions";
import { quizConfig } from "@/content/quiz.config";
import { motion } from "framer-motion";

export default function SocialResultPage() {
  const params = useParams();
  const percentage = parseInt(params.percentage as string) || 100;

  const { score, band } = useMemo(() => {
    // Map 0-100% to 6-24 pts scale
    const calculatedScore = Math.max(6, Math.min(24, Math.round((percentage / 100) * 18) + 6));
    const found = quizConfig.resultBands.find((band) => calculatedScore >= band.min && calculatedScore <= band.max);
    const resultBand = found || quizConfig.resultBands[quizConfig.resultBands.length - 1];
    
    return { score: calculatedScore, band: resultBand };
  }, [percentage]);

  return (
    <ScreenFrame>
      <div className="space-y-8 pb-12">
        <div className="text-center py-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red animate-pulse">
                Recording Final Result
            </span>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
        >
          <ResultSummary 
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
            shareText={`My result: ${band.label}! Discover your addiction profile.`}
            score={score}
            bandLabel={band.label}
            bandColor={band.color}
          />
        </motion.div>
      </div>
    </ScreenFrame>
  );
}

