import React from "react";
import { QuizQuestion, AnswerKey } from "@/lib/quiz/types";
import { AnswerOption } from "./AnswerOption";

interface QuestionCardProps {
  question: QuizQuestion;
  onSelect: (key: AnswerKey) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, disabled }) => {
  return (
    <section className="panel space-y-4">
      <p className="text-lg leading-snug text-brand-text">{question.prompt}</p>
      <div className="space-y-3">
        {question.answers.map((option, index) => (
          <AnswerOption 
            key={option.key} 
            option={option} 
            onSelect={(key) => onSelect(key as AnswerKey)} 
            index={index}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
};
