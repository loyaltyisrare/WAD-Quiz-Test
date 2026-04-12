export type AnswerKey = "A" | "B" | "C" | "D";

export interface QuizAnswerOption {
  key: AnswerKey;
  text: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  answers: QuizAnswerOption[];
}

export interface QuizResultBand {
  key: string;
  label: string;
  min: number;
  max: number;
  tagline: string;
  color: string;
}

export interface QuizConfig {
  meta: {
    id: string;
    title: string;
    subtitle: string;
  };
  scoring: {
    minScore: number;
    maxScore: number;
    answerKeyPoints: Record<AnswerKey, number>;
  };
  resultBands: QuizResultBand[];
  questions: QuizQuestion[];
}

export interface SessionLead {
  firstName: string;
  email: string;
  socialHandle?: string;
  phone?: string;
  consent: boolean;
  gender?: string;
  age?: string;
}

export interface QuizSessionState {
  sessionId: string;
  configId: string;
  startedAt: string;
  answers: Partial<Record<string, AnswerKey>>;
  completedQuizAt?: string;
  lead?: SessionLead;
  tracking?: {
    timeZone?: string;
    screenWidth?: number;
    screenHeight?: number;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
}
