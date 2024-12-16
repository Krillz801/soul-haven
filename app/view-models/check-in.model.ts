import { Observable } from '@nativescript/core';
import { DailyCheckInService, WeeklyReviewService, MonthlyReviewService } from '../services/check-in';
import { DailyCheckIn, WeeklyHighlight, MonthlyReview } from '../models/check-in.model';

export class CheckInViewModel extends Observable {
  private dailyCheckInService: DailyCheckInService;
  private weeklyReviewService: WeeklyReviewService;
  private monthlyReviewService: MonthlyReviewService;

  private _currentCheckIn: DailyCheckIn | null = null;
  private _weeklyHighlight: WeeklyHighlight | null = null;
  private _monthlyReview: MonthlyReview | null = null;

  constructor() {
    super();
    this.dailyCheckInService = new DailyCheckInService();
    this.weeklyReviewService = new WeeklyReviewService(this.dailyCheckInService);
    this.monthlyReviewService = new MonthlyReviewService(
      this.weeklyReviewService,
      this.dailyCheckInService
    );

    this.initializeToday();
  }

  private async initializeToday() {
    const existingCheckIn = this.dailyCheckInService.getTodayCheckIn();
    if (existingCheckIn) {
      this._currentCheckIn = existingCheckIn;
    } else {
      this._currentCheckIn = this.dailyCheckInService.createDailyCheckIn({});
    }
    this.notifyPropertyChange('currentCheckIn', this._currentCheckIn);
  }

  get currentCheckIn(): DailyCheckIn | null {
    return this._currentCheckIn;
  }

  get suggestedActivities(): string[] {
    return this._currentCheckIn
      ? this.dailyCheckInService.getSuggestedActivities(this._currentCheckIn.mood)
      : [];
  }

  get gratitudePrompts(): string[] {
    return this.dailyCheckInService.generateGratitudePrompts();
  }

  updateMood(mood: number) {
    if (this._currentCheckIn) {
      this._currentCheckIn.mood = mood;
      this.notifyPropertyChange('currentCheckIn', this._currentCheckIn);
      this.notifyPropertyChange('suggestedActivities', this.suggestedActivities);
    }
  }

  addActivity(activity: string) {
    if (this._currentCheckIn) {
      this._currentCheckIn.activities.push(activity);
      this.notifyPropertyChange('currentCheckIn', this._currentCheckIn);
    }
  }

  addGratitude(gratitude: string) {
    if (this._currentCheckIn) {
      this._currentCheckIn.gratitude.push(gratitude);
      this.notifyPropertyChange('currentCheckIn', this._currentCheckIn);
    }
  }

  generateWeeklyHighlight() {
    this._weeklyHighlight = this.weeklyReviewService.generateWeeklyHighlight();
    this.notifyPropertyChange('weeklyHighlight', this._weeklyHighlight);
  }

  generateMonthlyReview() {
    this._monthlyReview = this.monthlyReviewService.generateMonthlyReview();
    this.notifyPropertyChange('monthlyReview', this._monthlyReview);
  }
}