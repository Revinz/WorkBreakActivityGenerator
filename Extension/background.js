var timer = null;
let cycle = new Cycle();

chrome.storage.sync.clear();
//Restore the user's settings before starting
RestoreSettings(function () {
  console.log("Settings Restored");
}).then(Run());

/**
 * This is the main application
 */
function Run() {
  console.log("Run");
  console.log(cycle.toString());
  let a = new Activity("Test Activity");
  a.AddAllowedBreak(Phases.BREAK);
  onBadgeClick();
}

function StartTimer() {
  if (timer != null) {
    timer.Start();
  }
}

function PauseTimer() {
  if (timer != null) {
    timer.Pause();
  }
}

function onBadgeClick() {
  if (timer == null) {
    //Create Respective Timer for current phase
    if (cycle.currPhase == Phases.FOCUS) {
      CreateWorkTimer();
    } else {
      CreateBreakTimer();
    }
  } else {
    ToggleTimer();
  }
}

function ToggleTimer() {
  if (timer == null) {
    return;
  }
  if (timer.isRunning()) {
    PauseTimer();
  } else {
    StartTimer();
  }
}

function CreateTimer(name, duration, badgeColor, callback) {
  //Delete existing timer to prevent multiple timers running at once
  if (timer != null) {
    timer.Delete();
  }
  //Create the new timer
  timer = new Timer(name, duration, badgeColor, callback);
  console.log("New Timer created: " + name);
}

function CreateWorkTimer() {
  CreateTimer(cycle.currPhase, 10, "rgb(150, 30, 30)", WorkTimerEnd);
  StartTimer();
}

function WorkTimerEnd() {
  console.log("Work Ended");
  cycle.NextPhase();
  console.log("Total Work: " + cycle.FocusCount);
  CreateBreakTimer();
}

function CreateBreakTimer() {
  let duration = 5;
  let name = cycle.currPhase;
  if (cycle.isLongBreak) {
    duration = 10;
  }
  CreateTimer(name, duration, "rgb(30, 150, 30)", BreakTimerEnd);
  StartTimer();
}

function BreakTimerEnd() {
  console.log("Break ended");
  cycle.NextPhase();
  CreateWorkTimer();
}
