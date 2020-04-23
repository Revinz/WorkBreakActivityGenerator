var timer = null;
let cycle = new Cycle();

//TODO: Remove all of this after testing
var activities = [];

let piano = new Activity("Piano");
piano.AddAllowedBreak(Phases.LONG_BREAK);
let youtube = new Activity("Watch Youtube");
youtube.AddAllowedBreak(Phases.BREAK);
let anime = new Activity("Watch 1 episode of anime");
anime.AddAllowedBreak(Phases.LONG_BREAK);
let read_courage = new Activity("Read 'The courage to be disliked'");
read_courage.AddAllowedBreak(Phases.LONG_BREAK);
let read_shaman = new Activity("Read 'Tower of God'");
read_shaman.AddAllowedBreak(Phases.LONG_BREAK);
read_shaman.AddAllowedBreak(Phases.BREAK);
let read_tower = new Activity("Read 'Shaman King'");
read_tower.AddAllowedBreak(Phases.LONG_BREAK);
read_tower.AddAllowedBreak(Phases.BREAK);

activities.push(piano);
activities.push(youtube);
activities.push(anime);
activities.push(read_courage);
activities.push(read_tower);
activities.push(read_shaman);

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
  onBadgeClick();
}

function onBadgeClick() {
  //If no timer exists then we want to make a new one for the current phase
  if (timer == null) {
    timer = cycle.CreatePhaseTimer(cycle.currPhase);
  }
  //Then we can start the new timer / toggle the existing the one
  timer.Toggle();
}
