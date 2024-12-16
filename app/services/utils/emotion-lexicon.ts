export class EmotionLexicon {
  private emotionWords = new Map<string, number>([
    // Joy/Happiness (0.6 to 1.0)
    ['happy', 0.8], ['joyful', 0.9], ['excited', 0.85],
    ['peaceful', 0.7], ['content', 0.6], ['grateful', 0.75],
    
    // Sadness (-0.4 to -0.8)
    ['sad', -0.6], ['depressed', -0.8], ['lonely', -0.7],
    ['hurt', -0.65], ['hopeless', -0.75], ['empty', -0.5],
    
    // Anger (-0.6 to -1.0)
    ['angry', -0.7], ['furious', -0.9], ['rage', -1.0],
    ['frustrated', -0.6], ['irritated', -0.5],
    
    // Anxiety (-0.5 to -0.9)
    ['anxious', -0.7], ['worried', -0.6], ['scared', -0.8],
    ['nervous', -0.5], ['panicked', -0.9],
    
    // Self-Compassion (0.4 to 0.8)
    ['worthy', 0.7], ['deserving', 0.6], ['enough', 0.5],
    ['learning', 0.4], ['growing', 0.5], ['trying', 0.4]
  ]);

  private emotionIntensifiers = new Map<string, number>([
    ['very', 1.5], ['really', 1.4], ['extremely', 1.8],
    ['so', 1.3], ['totally', 1.6], ['completely', 1.7]
  ]);

  getEmotionalWords(words: string[]): Map<string, number> {
    const emotions = new Map<string, number>();
    let intensifier = 1;

    words.forEach((word, index) => {
      const lowercaseWord = word.toLowerCase();
      
      // Check for intensifiers
      if (this.emotionIntensifiers.has(lowercaseWord)) {
        intensifier = this.emotionIntensifiers.get(lowercaseWord)!;
        return;
      }

      // Check for emotion words
      if (this.emotionWords.has(lowercaseWord)) {
        const baseScore = this.emotionWords.get(lowercaseWord)!;
        emotions.set(lowercaseWord, baseScore * intensifier);
        intensifier = 1; // Reset intensifier
      }
    });

    return emotions;
  }

  addCustomEmotionWord(word: string, score: number) {
    this.emotionWords.set(word.toLowerCase(), score);
  }

  addCustomIntensifier(word: string, multiplier: number) {
    this.emotionIntensifiers.set(word.toLowerCase(), multiplier);
  }
}