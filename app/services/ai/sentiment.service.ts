import { EmotionLexicon } from '../utils/emotion-lexicon';
import { TextAnalysisUtils } from '../utils/text-analysis';

export class SentimentService {
  private lexicon = new EmotionLexicon();
  private textUtils = new TextAnalysisUtils();

  analyzeSentiment(text: string): {
    score: number;
    intensity: number;
    dominantEmotion: string;
    emotionalRange: string[];
  } {
    const words = this.textUtils.tokenize(text);
    const emotionalWords = this.lexicon.getEmotionalWords(words);
    const intensity = this.calculateIntensity(emotionalWords);
    
    return {
      score: this.calculateScore(emotionalWords),
      intensity,
      dominantEmotion: this.getDominantEmotion(emotionalWords),
      emotionalRange: this.getEmotionalRange(emotionalWords)
    };
  }

  private calculateScore(emotionalWords: Map<string, number>): number {
    let total = 0;
    emotionalWords.forEach((value) => total += value);
    return total / emotionalWords.size || 0.5;
  }

  private calculateIntensity(emotionalWords: Map<string, number>): number {
    const intensities = Array.from(emotionalWords.values());
    return Math.max(...intensities, 0);
  }

  private getDominantEmotion(emotionalWords: Map<string, number>): string {
    let maxEmotion = '';
    let maxValue = -Infinity;
    
    emotionalWords.forEach((value, emotion) => {
      if (value > maxValue) {
        maxValue = value;
        maxEmotion = emotion;
      }
    });
    
    return maxEmotion || 'neutral';
  }

  private getEmotionalRange(emotionalWords: Map<string, number>): string[] {
    return Array.from(emotionalWords.keys())
      .sort((a, b) => emotionalWords.get(b)! - emotionalWords.get(a)!)
      .slice(0, 3);
  }
}