import { Observable } from '@nativescript/core';
import { JournalEntry } from '../models/entry.model';
import { TherapeuticResponse, JournalAnalysis } from '../models/therapeutic.model';
import { SentimentService, PatternRecognitionService, TherapeuticResponseService } from '../services/ai';
import { TextAnalysisUtils } from '../services/utils/text-analysis';

export class JournalViewModel extends Observable {
  private _currentMood: number = 5;
  private _currentEntry: string = '';
  private _entries: JournalEntry[] = [];
  private _isInnerChildMode: boolean = false;
  private _currentAnalysis: JournalAnalysis | null = null;

  private sentimentService: SentimentService;
  private patternService: PatternRecognitionService;
  private therapeuticService: TherapeuticResponseService;
  private textUtils: TextAnalysisUtils;

  constructor() {
    super();
    this.sentimentService = new SentimentService();
    this.patternService = new PatternRecognitionService();
    this.therapeuticService = new TherapeuticResponseService();
    this.textUtils = new TextAnalysisUtils();
  }

  get currentPrompt(): string {
    const response = this._currentAnalysis?.therapeuticResponse;
    return response?.suggestions[0] ?? "How are you feeling right now?";
  }

  get supportMessage(): string {
    return this._currentAnalysis?.therapeuticResponse.message ?? 
           "I'm here to listen and support you.";
  }

  get currentEntry(): string {
    return this._currentEntry;
  }

  set currentEntry(value: string) {
    if (this._currentEntry !== value) {
      this._currentEntry = value;
      this.analyzeEntry(value);
    }
  }

  get validationMessage(): string {
    return this._currentAnalysis?.therapeuticResponse.validation ?? 
           "Your feelings are valid and important.";
  }

  get groundingExercise(): string {
    return this._currentAnalysis?.therapeuticResponse.grounding ?? 
           "Take a gentle breath and notice how you feel.";
  }

  private analyzeEntry(text: string) {
    if (!text.trim()) {
      this._currentAnalysis = null;
      return;
    }

    const sentiment = this.sentimentService.analyzeSentiment(text);
    const patterns = this.patternService.analyzePatterns(text);
    const therapeuticResponse = this.therapeuticService.generateResponse(
      text,
      this._isInnerChildMode
    );

    this._currentAnalysis = {
      sentiment: sentiment.score,
      emotionalRange: sentiment.emotionalRange,
      patterns: patterns.detectedPatterns.map(p => ({
        type: p,
        severity: patterns.severity
      })),
      therapeuticResponse
    };

    this.notifyPropertyChange('currentAnalysis', this._currentAnalysis);
    this.notifyPropertyChange('supportMessage', this.supportMessage);
    this.notifyPropertyChange('validationMessage', this.validationMessage);
    this.notifyPropertyChange('groundingExercise', this.groundingExercise);
    this.notifyPropertyChange('currentPrompt', this.currentPrompt);
  }

  toggleInnerChildMode() {
    this._isInnerChildMode = !this._isInnerChildMode;
    if (this._currentEntry) {
      this.analyzeEntry(this._currentEntry);
    }
    this.notifyPropertyChange('isInnerChildMode', this._isInnerChildMode);
  }

  addEntry() {
    if (!this._currentEntry.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      content: this._currentEntry,
      mood: this._currentMood,
      timestamp: new Date(),
      tags: this._currentAnalysis?.emotionalRange ?? [],
      innerChildMode: this._isInnerChildMode
    };
    
    this._entries.unshift(entry);
    this._currentEntry = '';
    this._currentAnalysis = null;
    
    this.notifyPropertyChange('entries', this._entries);
    this.notifyPropertyChange('currentEntry', this._currentEntry);
  }
}