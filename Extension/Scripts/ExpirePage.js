const ExpirePageProperties = {
  Action: "Setup",
  Phase: "Focus",
  NextPhase: "Break",
  Activity: "",
};

class ExpirePage {
  static async Show(properties) {
    let page = await SingletonPage.Create(
      chrome.extension.getURL("/Expire/expire.html")
    );
    return new ExpirePage(page, properties);
  }

  constructor(Page, properties) {
    this.page = Page;

    //Make the properties for the page
    this.properties = ExpirePageProperties; //Set default properties
    properties = { Phase: "Break", NextPhase: Phases.BREAK }; //TODO: Test properties remove later
    this.ValidateProperties(properties);
    this.SetProperties(properties);
    console.log(this.properties);

    //Send properties to the page for setup
    this.Setup(this.properties);
  }

  SetProperties(properties) {
    Object.keys(properties).forEach((key) => {
      this.properties[key] = properties[key];
    });

    //Generate activity if it is a break
    if (
      this.properties["NextPhase"] == Phases.BREAK ||
      this.properties["NextPhase"] == Phases.LONG_BREAK
    ) {
      this.properties["Activity"] = RandomBreakActivity(
        properties["NextPhase"],
        activities
      ).name;
      if (this.properties["Activity"] instanceof Error) {
        this.page.Close();
        alert(
          "No possible activities to generate. Please set an activity for " +
            properties["Phase"]
        );
        throw this.properties["Activity"];
      }
    }
  }

  /**
   * Checks if the properties given are correct, otherwise throws an error.
   */
  ValidateProperties(properties) {
    //All changed exists
    Object.keys(properties).forEach((key) => {
      if (!Object.keys(ExpirePageProperties).includes(key)) {
        throw Error("Key : " + key + " does not exist");
      }
    });
  }

  Setup(properties) {
    Object.assign(properties, { Action: "Setup" });
    chrome.tabs.sendRequest(this.page.tabId, properties);
  }
}
