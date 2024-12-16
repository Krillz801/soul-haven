import { Observable } from '@nativescript/core';
import { DailyCheckIn } from '../../models/check-in.model';
import { AIService } from '../ai.service';

export class DailyCheckInService extends Observable {
  private aiService: AIService;
  private checkIns: DailyCheckIn[] = [];

  constructor() {
    super();
    this.aiService = new AIService();
  }

  createDailyCheckIn(checkIn: Partial<DailyCheckIn>): DailyCheckIn {
    const newCheckIn: DailyCheckIn = {
      id: Date.now().toString(),
      date: new Date(),
      mood: checkIn.mood || 5,
      energyLevel: checkIn.energyLevel || 5,
      sleepQuality: checkIn.sleepQuality || 5,
      activities: checkIn.activities || [],
      gratitude: checkIn.gratitude || [],
      challenges: checkIn.challenges || [],
      copingStrategies: checkIn.copingStrategies || []
    };

    this.checkIns.unshift(newCheckIn);
    this.notifyPropertyChange('checkIns', this.checkIns);
    return newCheckIn;
  }

  getTodayCheckIn(): DailyCheckIn | undefined {
    const today = new Date().toDateString();
    return this.checkIns.find(checkIn => 
      checkIn.date.toDateString() === today
    );
  }

  getSuggestedActivities(mood: number): string[] {
    if (mood <= 3) {
      return [
        "Gentle movement or stretching",
        "Deep breathing exercises",
        "Listen to calming music",
        "Take a warm shower or bath"
      ];
    } else if (mood <= 6) {
      return [
        "Go for a short walk",
        "Journal your thoughts",
        "Practice mindfulness",
        "Connect with a friend"
      ];
    } else {
      return [
        "Engage in a creative activity",
        "Share your positive energy",
        "Work on a personal goal",
        "Try something new"
      ];
    }
  }

  generateGratitudePrompts(): string[] {
    return [
      "What made you smile today?",
      "Who or what supported you today?",
      "What small victory can you celebrate?",
      "What made you feel safe or comfortable?"
    ];
  }
}