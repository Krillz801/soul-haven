export interface EntryAnalysis {
  sentiment: number;
  emotions: string[];
  patterns: PatternAnalysis;
  suggestedSupport: SupportSuggestion;
}

export interface PatternAnalysis {
  hasSplitting: boolean;
  hasBlackAndWhite: boolean;
  hasIntenseEmotions: boolean;
}

export interface SupportSuggestion {
  type: 'crisis' | 'validation' | 'support';
  message: string;
  activities: string[];
}