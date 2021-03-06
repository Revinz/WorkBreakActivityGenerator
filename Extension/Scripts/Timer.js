//var TimerBadge = require("../Scripts/TimerBadge.js");

class Timer {
  /**
   * Creates a new Timer
   *
   * @constructor
   * @param {string} name The desired name of the timer
   * @param {*} duration The desired duration the time should last
   * @param {string} badgeColor The desired color as a string e.g "rgb(150, 30, 30)"
   * @param {*} callback The desired behavior to execute after the timer ends
   */

  constructor(name, duration, badgeColor, callback, cycle) {
    //Fields
    this.States = {
      RUNNING: 1,
      PAUSED: 2,
    };

    this.state = this.States.PAUSED;
    this.timeRemaining = duration; //In seconds
    this.timer = this.CreateIntervalTimer(this);
    this.callback = callback;
    this.name = name;
    this.badge = new TimerBadge(badgeColor);
    this.badge.color = badgeColor;
    console.log("Timer created: " + this.name);
  }

  /**
   * Starts / resumes the timer
   */
  Start() {
    this.state = this.States.RUNNING;

    this.badge.UpdateBadge(this.isRunning(), this.timeRemaining);
  }

  /**
   * Calls Start(). Only exists for semantic reason.
   */

  Resume() {
    this.Start();
  }

  Pause() {
    this.state = this.States.PAUSED;

    this.badge.UpdateBadge(this.isRunning(), this.timeRemaining);
  }

  /**
   * Stops the timer and deletes itself from the storage
   */
  Stop() {
    clearInterval(this.timer); //Removes the interval from the timer
    this.timer = null; //Allows for checking if the timer still has an interval or not
  }

  /**
   * Gets called when the timer has expired
   */
  Expire() {
    this.callback();
  }

  Toggle() {
    if (this.isRunning()) {
      this.Pause();
    } else {
      this.Start();
    }
  }

  Update() {
    if (this.isRunning()) {
      this.timeRemaining--;
      //console.log(this.name + " : " + this.timeRemaining);
    }

    this.badge.UpdateBadge(this.isRunning(), this.timeRemaining);
    if (this.timeRemaining <= 0) {
      this.Stop();
      this.Expire();
    }
  }

  CreateIntervalTimer(timer) {
    return setInterval(function () {
      timer.Update();
    }, 1000);
  }

  isRunning() {
    return this.state == this.States.RUNNING;
  }

  //For future use
  Delete() {
    this.Stop();
  }
}

//module.exports = Timer;
