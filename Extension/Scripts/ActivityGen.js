function RandomBreakActivity(Phase, activity_list) {
  var validActivities = activity_list.filter((a) =>
    a.AllowedBreaks.includes(Phase)
  );

  if (validActivities.length == 0) {
    return new Error("No activities set for " + Phase);
  }

  var random = Math.floor(Math.random() * validActivities.length);

  return validActivities[random];
}
