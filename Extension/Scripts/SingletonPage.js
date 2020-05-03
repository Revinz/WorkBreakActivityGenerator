const PageType = {
  TAB: 0,
  WINDOW: 1, //Not supported
};

class SingletonPage {
  /**
   * Creates and shows the desired page.
   *
   * @param {string} url The URL to open
   * @param {*} type Tab or Window. Warning: Only tab is supported
   * @param {*} properties
   */

  static async Create(url, type, properties) {
    let targetURL = new URL(url);
    var id = chrome.tabs.TAB_ID_NONE;
    //Search if page is already open
    let views = chrome.extension.getViews();
    console.log(views);
    //Check if page is already open
    for (var view of views) {
      if (view.location.href == url) {
        //Get page ID
        id = await new Promise((resolve) =>
          view.chrome.tabs.getCurrent((tab) => resolve(tab.id))
        );

        return new SingletonPage(id);
      }
    }

    //If not, create new tab
    await new Promise((resolve) => {
      chrome.tabs.create({ url: url }, function (tab) {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
          // make sure the status is 'loading' and it's the right tab
          if (changeInfo.status == "complete" && tab.url == url) {
            console.log("Tab created!");
            id = tab.id;
            resolve();
          }
        });
      });
    });
    return new SingletonPage(id);
  }

  constructor(tabId) {
    this.tabId = tabId;

    this.Focus(this.tabId);
  }

  //Makes the current tab the focus
  Focus() {
    var updateProperties = { active: true };
    chrome.tabs.update(this.tabId, updateProperties, (tab) => {});
  }

  //Closes the current tab
  Close() {
    chrome.tabs.remove(this.tabId);
  }
}
