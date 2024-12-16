export interface DailyCheckIn {
  id: string;
  date: Date;
  mood: number;
  energyLevel: number;
  sleepQuality: number;
  activities: string[];
  gratitude: string[];
  challenges: string[];
  copingStrategies: string[];
}

export interface WeeklyHighlight {
  weekStartDate: Date;
  weekEndDate: Date;
  averageMood: number;
  improvements: string[];
  challenges: string[];
  insights: string[];
  copingStrategiesUsed: string[];
  goalsForNextWeek: string[];
}

export interface MonthlyReview {
  month: number;
  year: number;
  emotionalTrends: {
    dominantEmotions: string[];
    moodRange: { min: number; max: number; average: number };
  };
  significantPatterns: {
    triggers: string[];
    copingStrategies: string[];
    improvements: string[];
  };
  personalGrowth: {
    achievements: string[];
    insights: string[];
    areasForFocus: string[];
  };
}