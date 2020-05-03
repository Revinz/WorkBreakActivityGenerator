chrome.extension.onRequest.addListener(function (
  message,
  sender,
  sendResponse
) {
  switch (message.Action) {
    case "Setup":
      Setup(message);
      break;
  }
});

function Setup(properties) {
  Object.keys(properties).forEach((key) => {
    console.log(key + " : " + properties[key]);
    switch (key) {
      case "Phase":
        $("#phase").text(properties[key] + " phase has ended");
        break;
      case "Activity":
        console.log("Activity: " + properties[key]);
        if (properties[key] == "") {
          //Using 'hidden' to prevent the div's space from disappearing
          $("#activity_div").css("visibility", "hidden");
        } else {
          $("#activity_div").css("visibility", "visible");
          $("#activity").text(properties[key]);
        }
        break;
      case "NextPhase":
        $("#bnNextPhase").text("Start " + properties[key]);
        break;
    }
  });
}
