function Notify(title, message, cycle) {
  chrome.notifications.create(
    {
      type: "basic",
      iconUrl: "alarmclock.png",
      title: title,
      message: "",
      silent: false,
      requireInteraction: false,
    },
    function () {}
  );

  chrome.notifications.onClicked.addListener();
}
