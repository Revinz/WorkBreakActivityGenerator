function RandomBreakActivity(Phase) {
  let random = Math.floor(Math.random() * activities.length);
  console.log("Random: " + random);
  return activities[random];
}
