import React from "react";
import { QuizAnswerOption } from "@/lib/quiz/types";

interface AnswerOptionProps {
  option: QuizAnswerOption;
  onSelect: (key: string) => void;
  index: number;
  disabled?: boolean;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({ option, onSelect, index, disabled }) => {
  const label = ["A", "B", "C", "D"][index];
  
  return (
    <button
      onClick={() => onSelect(option.key)}
      disabled={disabled}
      className="w-full rounded-xl border border-brand-line bg-black/35 px-4 py-4 text-left text-sm text-brand-text transition hover:border-brand-accent hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed group"
      type="button"
    >
      <span className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-brand-muted group-hover:text-brand-accent transition-colors">
        {label}
      </span>
      <span className="block leading-relaxed">{option.text}</span>
    </button>
  );
};
