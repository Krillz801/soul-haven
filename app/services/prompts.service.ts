export class PromptsService {
  private innerChildPrompts = [
    "What would little you love to do right now?",
    "Is there a comfort item that would help you feel safe?",
    "What's your favorite childhood memory?",
    "Would you like to draw or color something?",
  ];

  private adultPrompts = [
    "What would help you feel grounded right now?",
    "Can you identify what triggered these feelings?",
    "What kind of support do you need in this moment?",
    "How can we make this situation feel a bit more manageable?",
  ];

  private validationMessages = [
    "Your feelings are valid",
    "It's okay to feel this way",
    "You're doing the best you can",
    "You don't have to have it all figured out",
  ];

  getPrompt(isInnerChildMode: boolean, sentiment: number): string {
    const prompts = isInnerChildMode ? this.innerChildPrompts : this.adultPrompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  getValidationMessage(): string {
    return this.validationMessages[Math.floor(Math.random() * this.validationMessages.length)];
  }
}