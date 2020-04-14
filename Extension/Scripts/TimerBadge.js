class TimerBadge {
  constructor(color) {
    this.enabled = true;
    this.color = color;
  }

  /**
   * Updates the badge on the pop-up icon
   *
   */
  UpdateBadge(isRunning, timeRemaining) {
    if (!this.enabled) {
      return;
    }

    let badgeText = this.formatTime(timeRemaining);

    chrome.browserAction.setBadgeBackgroundColor({ color: this.color });

    //Set text based on state
    if (isRunning) {
      chrome.browserAction.setBadgeText({
        text: badgeText,
      });
    }

    //Paused
    else {
      chrome.browserAction.setBadgeText({
        text: "—",
      });
    }
  }

  /**
   * Format's the time into 'Zs', '< 10s','< 30s', 'Ym', 'X:Yh' depending on the time given
   *
   * @param {int} timeRemaining
   */
  formatTime(timeRemaining) {
    if (timeRemaining <= 10) {
      //5 seconds and below
      return timeRemaining + "s";
    } else if (timeRemaining < 30) {
      // below 30 seconds
      return "< 30s";
    } else if (timeRemaining < 60) {
      // Below 1 minute
      return "< 1m";
    } else if (timeRemaining < 3600) {
      //Below 60 minutes
      return Math.floor(timeRemaining / 60) + "m";
    } else if (timeRemaining >= 3600) {
      //Above 1 hour
      return (
        Math.floor(timeRemaining / 3600) + //hours
        ":" +
        Math.floor((timeRemaining % 3600) / 60) + //remaining minutes within the hour
        "h"
      );
    }

    return timeRemaining.toString() + "s";
  }
}

//module.exports = TimerBadge;
