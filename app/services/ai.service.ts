import { Observable } from '@nativescript/core';

export class AIService extends Observable {
  private sentimentThresholds = {
    crisis: 0.2,
    distressed: 0.4,
    neutral: 0.6,
    positive: 0.8
  };

  private emotionPatterns = {
    splitting: /\b(always|never|everyone|no one|everything|nothing)\b/gi,
    blackAndWhite: /(good|bad|perfect|terrible|awful|amazing)\b/gi,
    intensifiers: /(really|very|extremely|totally|absolutely)\b/gi
  };

  analyzeEntry(text: string): EntryAnalysis {
    const analysis: EntryAnalysis = {
      sentiment: this.analyzeSentiment(text),
      emotions: this.detectEmotions(text),
      patterns: this.detectPatterns(text),
      suggestedSupport: this.generateSupportSuggestion(text)
    };

    return analysis;
  }

  private analyzeSentiment(text: string): number {
    // Simplified sentiment analysis
    const positiveWords = /(happy|good|great|calm|peaceful|safe|loved|supported)/gi;
    const negativeWords = /(sad|bad|angry|scared|alone|hurt|overwhelmed|anxious)/gi;
    
    const positiveCount = (text.match(positiveWords) || []).length;
    const negativeCount = (text.match(negativeWords) || []).length;
    const totalWords = text.split(/\s+/).length;

    return (positiveCount - negativeCount + totalWords) / (2 * totalWords);
  }

  private detectEmotions(text: string): string[] {
    const emotions = [];
    const emotionPatterns = {
      anxiety: /(worried|anxious|nervous|scared|fear)/gi,
      sadness: /(sad|lonely|depressed|empty|hurt)/gi,
      anger: /(angry|mad|frustrated|upset|rage)/gi,
      joy: /(happy|excited|peaceful|grateful|calm)/gi
    };

    for (const [emotion, pattern] of Object.entries(emotionPatterns)) {
      if (pattern.test(text)) {
        emotions.push(emotion);
      }
    }

    return emotions;
  }

  private detectPatterns(text: string): PatternAnalysis {
    return {
      hasSplitting: this.emotionPatterns.splitting.test(text),
      hasBlackAndWhite: this.emotionPatterns.blackAndWhite.test(text),
      hasIntenseEmotions: this.emotionPatterns.intensifiers.test(text)
    };
  }

  generateSupportSuggestion(text: string): SupportSuggestion {
    const sentiment = this.analyzeSentiment(text);
    const emotions = this.detectEmotions(text);
    const patterns = this.detectPatterns(text);

    if (sentiment < this.sentimentThresholds.crisis) {
      return {
        type: 'crisis',
        message: "I notice you're having a really hard time. Would you like to try some grounding exercises together?",
        activities: this.getCrisisActivities()
      };
    }

    if (patterns.hasSplitting) {
      return {
        type: 'validation',
        message: "I hear how intense these feelings are. Can we explore the gray areas together?",
        activities: this.getValidationActivities()
      };
    }

    // Default supportive response
    return {
      type: 'support',
      message: "I'm here with you. What kind of support would feel most helpful right now?",
      activities: this.getSupportActivities()
    };
  }

  private getCrisisActivities(): string[] {
    return [
      "Let's take 3 deep breaths together",
      "Can you name 5 things you can see right now?",
      "Hold something cold or warm - notice how it feels",
      "Listen to a calming sound or song"
    ];
  }

  private getValidationActivities(): string[] {
    return [
      "Your feelings are valid, even when they're complex",
      "It's okay to have mixed feelings about people and situations",
      "You can hold space for different truths at the same time"
    ];
  }

  private getSupportActivities(): string[] {
    return [
      "Would you like to try a gentle grounding exercise?",
      "How about we focus on something soothing?",
      "What's one tiny thing that might help right now?"
    ];
  }
}