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

    timer = this.CreatePhaseTimer(this.currPhase);
    timer.Start(); //TODO: Temporary: Only used for testing
  }

  CreatePhaseTimer(phase) {
    if (phase == Phases.FOCUS) {
      return new Timer(
        this.currPhase,
        10,
        "rgb(150, 30, 30)",
        this.NextPhase.bind(this)
      );
    } else {
      let duration = 5;
      if (this.isLongBreak) {
        duration = 10;
      }
      return new Timer(
        this.currPhase,
        duration,
        "rgb(30, 150, 30)",
        this.NextPhase.bind(this)
      );
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
