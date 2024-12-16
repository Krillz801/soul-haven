import { SentimentService } from './sentiment.service';
import { PatternRecognitionService } from './pattern-recognition.service';

export class TherapeuticResponseService {
  private sentimentService: SentimentService;
  private patternService: PatternRecognitionService;

  constructor() {
    this.sentimentService = new SentimentService();
    this.patternService = new PatternRecognitionService();
  }

  generateResponse(text: string, isInnerChildMode: boolean): TherapeuticResponse {
    const sentiment = this.sentimentService.analyzeSentiment(text);
    const patterns = this.patternService.analyzePatterns(text);
    
    return {
      message: this.createSupportiveMessage(sentiment, patterns, isInnerChildMode),
      suggestions: this.createSuggestions(sentiment, patterns, isInnerChildMode),
      validation: this.createValidation(sentiment, patterns),
      grounding: this.selectGroundingExercise(sentiment, isInnerChildMode)
    };
  }

  private createSupportiveMessage(
    sentiment: ReturnType<SentimentService['analyzeSentiment']>,
    patterns: ReturnType<PatternRecognitionService['analyzePatterns']>,
    isInnerChildMode: boolean
  ): string {
    if (sentiment.intensity > 0.8) {
      return isInnerChildMode
        ? "It sounds like you're having some really big feelings right now. Would you like a gentle hug?"
        : "I hear how intense these emotions are. Let's take this one step at a time.";
    }

    if (patterns.severity > 0.7) {
      return isInnerChildMode
        ? "Sometimes things feel very confusing and that's okay. You're safe here."
        : "These situations can feel overwhelming. Let's explore this together.";
    }

    return isInnerChildMode
      ? "You're doing a great job sharing your feelings. What would help you feel safer?"
      : "Thank you for sharing. What kind of support would be most helpful right now?";
  }

  private createSuggestions(
    sentiment: ReturnType<SentimentService['analyzeSentiment']>,
    patterns: ReturnType<PatternRecognitionService['analyzePatterns']>,
    isInnerChildMode: boolean
  ): string[] {
    const suggestions: string[] = [];

    if (isInnerChildMode) {
      suggestions.push(
        "Would you like to draw how you're feeling?",
        "Maybe we could take a few deep breaths together?",
        "Is there a comfort item nearby that might help?"
      );
    } else {
      suggestions.push(...patterns.suggestions);
    }

    return suggestions;
  }

  private createValidation(
    sentiment: ReturnType<SentimentService['analyzeSentiment']>,
    patterns: ReturnType<PatternRecognitionService['analyzePatterns']>
  ): string {
    const validations = [
      "Your feelings are valid and important",
      "It's okay to feel this way",
      "You're doing the best you can",
      "These feelings won't last forever",
      "You deserve support and understanding"
    ];

    return validations[Math.floor(Math.random() * validations.length)];
  }

  private selectGroundingExercise(
    sentiment: ReturnType<SentimentService['analyzeSentiment']>,
    isInnerChildMode: boolean
  ): string {
    if (isInnerChildMode) {
      return sentiment.intensity > 0.7
        ? "Let's count all the colors we can see in the room"
        : "Can you give yourself a gentle hug?";
    }

    return sentiment.intensity > 0.7
      ? "Place your feet firmly on the ground and take three slow breaths"
      : "Notice five things you can see around you";
  }
}