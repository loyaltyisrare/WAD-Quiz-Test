import { AnswerKey } from "./types";
import { quizConfig } from "@/content/quiz.config";

export function scoreFromAnswers(answers: Partial<Record<string, AnswerKey>>): number {
  let totalPoints = 0;
  
  quizConfig.questions.forEach((q) => {
    const selectedKey = answers[q.id];
    if (selectedKey) {
      const option = q.answers.find((a) => a.key === selectedKey);
      if (option) {
        totalPoints += option.points;
      }
    }
  });
  
  return totalPoints;
}

export function getResultBand(score: number) {
  return quizConfig.resultBands.find((band) => score >= band.min && score <= band.max) 
    || quizConfig.resultBands[quizConfig.resultBands.length - 1];
}
