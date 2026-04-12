import React from "react";
import { motion } from "framer-motion";
import { QuizAnswerOption } from "@/lib/quiz/types";

interface AnswerOptionProps {
  option: QuizAnswerOption;
  onSelect: (key: string) => void;
  disabled?: boolean;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({ option, onSelect, disabled }) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, backgroundColor: "rgba(214, 211, 193, 0.1)" } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      onClick={() => onSelect(option.key)}
      className={`relative w-full text-left p-4 md:p-6 rounded-2xl glass-card transition-all group flex items-start gap-4 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:border-brand-accent/40 cursor-pointer"
      }`}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-accent/30 flex items-center justify-center font-bold text-sm text-brand-accent/60 group-hover:border-brand-accent/60 group-hover:text-brand-accent transition-colors">
        {option.key}
      </div>
      <span className="text-lg md:text-xl font-medium leading-normal text-white/90 group-hover:text-white transition-colors">
        {option.text}
      </span>
    </motion.button>
  );
};
