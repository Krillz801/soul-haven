import { TextAnalysisUtils } from '../utils/text-analysis';

export class PatternRecognitionService {
  private textUtils = new TextAnalysisUtils();

  private patterns = {
    splitting: {
      keywords: ['always', 'never', 'everyone', 'no one', 'everything', 'nothing'],
      weight: 2
    },
    blackAndWhite: {
      keywords: ['perfect', 'terrible', 'awful', 'amazing', 'horrible', 'wonderful'],
      weight: 1.5
    },
    catastrophizing: {
      keywords: ['disaster', 'end of the world', 'can\'t handle', 'unbearable'],
      weight: 1.8
    },
    selfCritical: {
      keywords: ['worthless', 'stupid', 'failure', 'useless', 'hate myself'],
      weight: 2
    }
  };

  analyzePatterns(text: string): {
    detectedPatterns: string[];
    severity: number;
    suggestions: string[];
  } {
    const tokens = this.textUtils.tokenize(text);
    const patterns = this.detectPatterns(tokens);
    const severity = this.calculateSeverity(patterns);

    return {
      detectedPatterns: Array.from(patterns.keys()),
      severity,
      suggestions: this.generateSuggestions(patterns)
    };
  }

  private detectPatterns(tokens: string[]): Map<string, number> {
    const detected = new Map<string, number>();

    Object.entries(this.patterns).forEach(([pattern, config]) => {
      const matches = config.keywords.filter(keyword => 
        tokens.some(token => token.toLowerCase().includes(keyword))
      );
      
      if (matches.length > 0) {
        detected.set(pattern, matches.length * config.weight);
      }
    });

    return detected;
  }

  private calculateSeverity(patterns: Map<string, number>): number {
    let total = 0;
    patterns.forEach(weight => total += weight);
    return Math.min(total / 10, 1);
  }

  private generateSuggestions(patterns: Map<string, number>): string[] {
    const suggestions: string[] = [];
    
    patterns.forEach((weight, pattern) => {
      switch(pattern) {
        case 'splitting':
          suggestions.push('Can we explore the middle ground together?');
          break;
        case 'blackAndWhite':
          suggestions.push('There might be more shades to this situation.');
          break;
        case 'catastrophizing':
          suggestions.push('Let\'s take a step back and look at this one piece at a time.');
          break;
        case 'selfCritical':
          suggestions.push('You deserve the same kindness you\'d show a friend.');
          break;
      }
    });

    return suggestions;
  }
}