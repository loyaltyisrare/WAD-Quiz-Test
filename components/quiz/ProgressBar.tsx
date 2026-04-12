import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8 px-4">
      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-accent/50 mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="h-full bg-brand-red shadow-[0_0_10px_rgba(243,57,57,0.5)]"
        />
      </div>
    </div>
  );
};
