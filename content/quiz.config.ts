import { QuizConfig } from "@/lib/quiz/types";

export const quizConfig: QuizConfig = {
  meta: {
    id: "wad-quiz-v1",
    title: "What Are You Really Addicted To?",
    subtitle: "Six quick questions to reveal whether you’re drawn to a woman’s depth, power, and rarity, or just the surface."
  },
  scoring: {
    minScore: 6,
    maxScore: 24,
    answerKeyPoints: {
      A: 4,
      B: 3,
      C: 2,
      D: 1
    }
  },
  resultBands: [
    {
      key: "addicted_to_greatness",
      label: "Addicted to Greatness",
      min: 21,
      max: 24,
      tagline: "You are drawn to substance, strength, character, and rarity. You recognize when a woman carries depth, standards, and real presence.",
      color: "#FFD700" // Elevated Gold
    },
    {
      key: "drawn_to_depth",
      label: "Drawn to Depth",
      min: 16,
      max: 20,
      tagline: "You appreciate more than the surface. You notice power, uniqueness, and real value, even if excitement still catches your eye sometimes.",
      color: "#FFBF00" // Amber
    },
    {
      key: "attracted_to_vibe",
      label: "Attracted to the Vibe",
      min: 11,
      max: 15,
      tagline: "You respond to energy, chemistry, and appearance first. You feel the moment fast, but deeper qualities do not always lead the way.",
      color: "#FF8C00" // Dark Orange
    },
    {
      key: "chasing_the_moment",
      label: "Chasing the Moment",
      min: 6,
      max: 10,
      tagline: "Right now, you are more pulled by convenience, attention, and surface-level attraction than real substance.",
      color: "#F33939" // Warning Red
    }
  ],
  questions: [
    {
      id: "q1",
      prompt: "What pulls you in first about a woman?",
      answers: [
        { key: "A", text: "Her presence. The way she carries strength without needing to prove it.", points: 4 },
        { key: "B", text: "Her uniqueness. She feels different from everyone else.", points: 3 },
        { key: "C", text: "Her beauty and the attention she naturally gets.", points: 2 },
        { key: "D", text: "The energy of the moment and how easy it feels.", points: 1 }
      ]
    },
    {
      id: "q2",
      prompt: "A woman has high standards, strong boundaries, and knows exactly who she is. What is your reaction?",
      answers: [
        { key: "A", text: "I respect it. That kind of woman stands out for a reason.", points: 4 },
        { key: "B", text: "I’m intrigued. Confidence like that is hard to ignore.", points: 3 },
        { key: "C", text: "I like it, but it can feel a little intense.", points: 2 },
        { key: "D", text: "I would rather deal with someone less complicated.", points: 1 }
      ]
    },
    {
      id: "q3",
      prompt: "Which kind of woman stays on your mind the longest?",
      answers: [
        { key: "A", text: "The one with depth, gifts, ambition, and real substance.", points: 4 },
        { key: "B", text: "The one who feels rare and impossible to compare.", points: 3 },
        { key: "C", text: "The one who is exciting, attractive, and fun to be around.", points: 2 },
        { key: "D", text: "The one who gives me attention when I want it.", points: 1 }
      ]
    },
    {
      id: "q4",
      prompt: "When a woman has been through pain but still moves with strength, what does that do for you?",
      answers: [
        { key: "A", text: "It draws me in more. Resilience makes her even more powerful.", points: 4 },
        { key: "B", text: "It makes me want to understand her story.", points: 3 },
        { key: "C", text: "I notice it, but it is not what matters most to me.", points: 2 },
        { key: "D", text: "I do not really think that deeply about it.", points: 1 }
      ]
    },
    {
      id: "q5",
      prompt: "Be honest. What are you really attracted to most?",
      answers: [
        { key: "A", text: "A woman who is desirable, resilient, unique, gifted, and strong.", points: 4 },
        { key: "B", text: "A woman with a rare energy that leaves a lasting impression.", points: 3 },
        { key: "C", text: "A woman who looks good, feels exciting, and keeps things interesting.", points: 2 },
        { key: "D", text: "A woman who is easy, available, and simple to deal with.", points: 1 }
      ]
    },
    {
      id: "q6",
      prompt: "What kind of woman are you actually addicted to?",
      answers: [
        { key: "A", text: "The kind that makes you respect her, admire her, and level up.", points: 4 },
        { key: "B", text: "The kind you never fully forget because she was different.", points: 3 },
        { key: "C", text: "The kind that is thrilling while it lasts.", points: 2 },
        { key: "D", text: "The kind that fills a moment but does not leave much behind.", points: 1 }
      ]
    }
  ]
};
