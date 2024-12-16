export interface TherapeuticResponse {
  message: string;
  suggestions: string[];
  validation: string;
  grounding: string;
}

export interface EmotionalState {
  dominantEmotion: string;
  intensity: number;
  patterns: string[];
  suggestions: string[];
}

export interface JournalAnalysis {
  sentiment: number;
  emotionalRange: string[];
  patterns: {
    type: string;
    severity: number;
  }[];
  therapeuticResponse: TherapeuticResponse;
}