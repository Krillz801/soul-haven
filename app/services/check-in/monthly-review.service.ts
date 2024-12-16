import { MonthlyReview } from '../../models/check-in.model';
import { WeeklyReviewService } from './weekly-review.service';
import { DailyCheckInService } from './daily-check-in.service';

export class MonthlyReviewService {
  private monthlyReviews: MonthlyReview[] = [];

  constructor(
    private weeklyReviewService: WeeklyReviewService,
    private dailyCheckInService: DailyCheckInService
  ) {}

  generateMonthlyReview(): MonthlyReview {
    const today = new Date();
    const monthlyReview: MonthlyReview = {
      month: today.getMonth(),
      year: today.getFullYear(),
      emotionalTrends: this.analyzeEmotionalTrends(),
      significantPatterns: this.identifyPatterns(),
      personalGrowth: this.assessGrowth()
    };

    this.monthlyReviews.unshift(monthlyReview);
    return monthlyReview;
  }

  private analyzeEmotionalTrends(): MonthlyReview['emotionalTrends'] {
    return {
      dominantEmotions: [
        "Hopeful",
        "Anxious",
        "Peaceful"
      ],
      moodRange: {
        min: 3,
        max: 8,
        average: 5.5
      }
    };
  }

  private identifyPatterns(): MonthlyReview['significantPatterns'] {
    return {
      triggers: [
        "Work deadlines",
        "Social interactions",
        "Sleep disruption"
      ],
      copingStrategies: [
        "Mindfulness",
        "Creative expression",
        "Support system"
      ],
      improvements: [
        "Better emotional awareness",
        "More consistent self-care",
        "Increased resilience"
      ]
    };
  }

  private assessGrowth(): MonthlyReview['personalGrowth'] {
    return {
      achievements: [
        "Established daily check-in routine",
        "Learned new coping strategies",
        "Improved emotional expression"
      ],
      insights: [
        "Progress isn't linear",
        "Small steps matter",
        "Self-compassion helps healing"
      ],
      areasForFocus: [
        "Building consistent routines",
        "Expanding support network",
        "Practicing boundaries"
      ]
    };
  }
}