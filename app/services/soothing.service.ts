export class SoothingService {
  private innerChildActivities = [
    "Hug your favorite stuffed animal",
    "Watch a comforting cartoon",
    "Color in a coloring book",
    "Have a warm milk with honey",
    "Build a cozy blanket fort",
    "Listen to a childhood lullaby",
  ];

  private adultActivities = [
    "Take three deep breaths",
    "Feel something soft nearby",
    "Name 5 things you can see",
    "Hold a warm cup of tea",
    "Do a gentle stretch",
    "Listen to calming nature sounds",
  ];

  private crisisActivities = [
    "Hold an ice cube in your hand",
    "Count backwards from 100 by 7s",
    "Name all the colors you can see",
    "Focus on your feet touching the ground",
  ];

  getSoothingActivity(isInnerChildMode: boolean, isCrisis: boolean = false): string {
    if (isCrisis) {
      return this.crisisActivities[Math.floor(Math.random() * this.crisisActivities.length)];
    }
    
    const activities = isInnerChildMode ? this.innerChildActivities : this.adultActivities;
    return activities[Math.floor(Math.random() * activities.length)];
  }
}