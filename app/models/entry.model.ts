export interface JournalEntry {
  id: string;
  content: string;
  mood: number;
  timestamp: Date;
  tags: string[];
  innerChildMode: boolean;
}

export interface MoodCheck {
  rating: number;
  reason: string;
  timestamp: Date;
}