class Activity {
  constructor(_name) {
    this.Rename(_name);
    this.AllowedBreaks = [];
    this.LastPickedInterval = 0; //How long time it has been since this activity got chosen
  }

  /**
   * Renames the activity
   * @param {String} name
   */
  Rename(name) {
    this.name = name;
  }

  /**
   * Adds a break phase to the allowed phases of the activity
   * @param {Phase} _break_type
   */
  AddAllowedBreak(_break_type) {
    if (_break_type == Phases.FOCUS) {
      console.log("Now Allowed");
    } else {
      //Add break type to the list of allowed break types if not already in it
      if (!this.AllowedBreaks.includes(_break_type)) {
        this.AllowedBreaks.push(_break_type);
        console.log("Allowed: " + _break_type);
      }
    }
  }

  /**
   * Checks if the activity is allowed in the current phase.
   * Returns true if allowed, otherwise false
   * @param {Phase} break_type
   */
  isAllowedForBreak(break_type) {
    if (this.AllowedBreaks.includes(break_type)) {
      return true;
    } else {
      return false;
    }
  }
}
