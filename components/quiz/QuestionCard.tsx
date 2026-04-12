import React from "react";
import { QuizQuestion, AnswerKey } from "@/lib/quiz/types";
import { AnswerOption } from "./AnswerOption";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: QuizQuestion;
  onSelect: (key: AnswerKey) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, disabled }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 px-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-center md:text-left">
          {question.prompt}
        </h2>
      </motion.div>

      <div className="space-y-4 px-4">
        {question.answers.map((option, index) => (
          <motion.div
            key={option.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AnswerOption
              option={option}
              onSelect={(key) => onSelect(key as AnswerKey)}
              disabled={disabled}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
