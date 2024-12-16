export class TextAnalysisUtils {
  tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s']|_/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ');
  }

  findRepeatedPhrases(text: string): Map<string, number> {
    const phrases = new Map<string, number>();
    const words = this.tokenize(text);
    
    // Look for 2-3 word phrases
    for (let i = 0; i < words.length - 1; i++) {
      for (let len = 2; len <= 3 && i + len <= words.length; len++) {
        const phrase = words.slice(i, i + len).join(' ');
        phrases.set(phrase, (phrases.get(phrase) || 0) + 1);
      }
    }

    // Filter out single occurrences
    return new Map([...phrases].filter(([_, count]) => count > 1));
  }

  calculateReadability(text: string): number {
    const words = this.tokenize(text);
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const avgWordsPerSentence = words.length / sentences.length;
    
    // Simple readability score (0-1)
    return Math.min(1, avgWordsPerSentence / 20);
  }

  findEmotionalTransitions(text: string): string[] {
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const transitions: string[] = [];
    
    for (let i = 1; i < sentences.length; i++) {
      const prev = sentences[i - 1].toLowerCase();
      const curr = sentences[i].toLowerCase();
      
      if (this.hasEmotionalShift(prev, curr)) {
        transitions.push(`${sentences[i - 1]} → ${sentences[i]}`);
      }
    }
    
    return transitions;
  }

  private hasEmotionalShift(prev: string, curr: string): boolean {
    const positiveWords = /(happy|good|great|better|calm|peaceful)/;
    const negativeWords = /(sad|bad|worse|angry|scared|anxious)/;
    
    const prevPositive = positiveWords.test(prev);
    const prevNegative = negativeWords.test(prev);
    const currPositive = positiveWords.test(curr);
    const currNegative = negativeWords.test(curr);
    
    return (prevPositive && currNegative) || (prevNegative && currPositive);
  }
}