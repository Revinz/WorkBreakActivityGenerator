class Activity {
  constructor(_name) {
    if (_name == undefined || _name.trim() == "") {
      return new Error("Invalid Name");
    }

    this.Rename(_name);
    this.AllowedBreaks = [];
    this.LastPickedInterval = 0; //How long time it has been since this activity got chosen
    this.url;
  }

  /**
   * Renames the activity
   * @param {String} name
   * @public
   */
  Rename(name) {
    this.name = name;
  }

  SetURL(url) {
    this.url = url;
  }

  /**
   * Adds a break phase to the allowed phases of the activity
   * @param {Phase} _break_type
   * @public
   */
  AddAllowedBreak(_break_type) {
    if (_break_type == Phases.FOCUS) {
      return new Error(
        "Not allowed a non break phase to allowed breaks for the activity"
      );
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
   * @private
   */
  isAllowedForBreak(break_type) {
    if (this.AllowedBreaks.includes(break_type)) {
      return true;
    } else {
      return false;
    }
  }
}
