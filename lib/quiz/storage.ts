import { QuizSessionState, AnswerKey, SessionLead } from "./types";
import { quizConfig } from "@/content/quiz.config";

const SESSION_KEY = "wad_quiz_session";

export function getSessionState(): QuizSessionState {
  if (typeof window === "undefined") return {} as QuizSessionState;
  
  const stored = localStorage.getItem(SESSION_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const newState: QuizSessionState = {
    sessionId: Math.random().toString(36).substring(2, 15),
    configId: quizConfig.meta.id,
    startedAt: new Date().toISOString(),
    answers: {},
    tracking: {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      referrer: document.referrer,
    }
  };

  saveSessionState(newState);
  return newState;
}

export function saveSessionState(state: QuizSessionState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(state));
}

export function saveAnswer(questionId: string, answer: AnswerKey) {
  const state = getSessionState();
  state.answers[questionId] = answer;
  saveSessionState(state);
}

export function saveLead(lead: SessionLead) {
  const state = getSessionState();
  state.lead = lead;
  saveSessionState(state);
}

export function markQuizCompleted() {
  const state = getSessionState();
  state.completedQuizAt = new Date().toISOString();
  saveSessionState(state);
}

export function resetSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
