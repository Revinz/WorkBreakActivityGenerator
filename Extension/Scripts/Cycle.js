Phases = {
  FOCUS: "Focus",
  BREAK: "Short Break",
  LONG_BREAK: "Long Break",
};

class Cycle {
  constructor() {
    this.Restart();
  }

  NextPhase() {
    if (this.currPhase == Phases.FOCUS) {
      this.FocusPhaseCompleted();

      if (this.isLongBreak) {
        this.currPhase = Phases.LONG_BREAK;
      } else {
        this.currPhase = Phases.BREAK;
      }
    } else {
      this.currPhase = Phases.FOCUS;
    }
  }

  /**
   * Updates the focus count and
   * checks if the next phase is a long break
   */
  FocusPhaseCompleted() {
    this.FocusCount++;

    if (this.FocusCount % 3 == 0 && this.FocusCount != 0) {
      this.isLongBreak = true;
    }
  }

  Restart() {
    this.FocusCount = 0; //How many times a work timer has been completed
    this.longBreakInterval = 3; //How many focuses required for a long break
    this.isLongBreak = false;
    this.currPhase = Phases.FOCUS;
  }

  toString() {
    return (
      "Cycle phase: " +
      this.currPhase +
      "\nCycle Focus Count: " +
      this.FocusCount
    );
  }
}
