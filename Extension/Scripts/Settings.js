var Settings = {
  WorkDuration: 1,
  ShortBreakDuration: 1,
  LongBreakDuration: 2
};

/**
 * Retrieves the user's settings
 */
async function RestoreSettings(callback) {
  chrome.storage.sync.get(["Settings"], function(result) {
    //If the settings does not exist, create settings
    if (result.Settings == null) {
      console.log("No settings found, uploading default settings");
      SaveSettings();
    } else {
      Settings = result.Settings;
    }

    callback();
  });
}

/**
 * Stores the user's settings
 */
function SaveSettings() {
  chrome.storage.sync.set({
    Settings: Settings
  });
}

function SaveDefaultSettings() {
  chrome.storage.sync.set(
    {
      DefaultSettings: Settings
    },
    function() {
      console.log("Saved Default Settings");
    }
  );
}

function RestoreDefaultSettings() {
  chrome.storage.sync.get(["DefaultSettings"], function(result) {
    SaveSettings();
  });
}
