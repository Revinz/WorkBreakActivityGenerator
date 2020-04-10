var background = chrome.extension.getBackgroundPage();

window.onload = function () {
  background.onBadgeClick();
  window.close();
};
