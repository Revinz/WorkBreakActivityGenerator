//var Timer = require("../Extension/Scripts/Timer.js");

describe("Timer", function () {
  describe("Constructor", function () {
    it("All Arguments Filled", function () {
      //Arrange
      let fnc = function () {};
      let name = "Test Timer";
      let duration = 10;
      let color = "rgb(150, 30, 30)";
      //Act
      var timer = new Timer(name, duration, color, fnc);
      //Assert
      expect(timer).not.toBeNull();
    });
  });

  describe("Interactions", function () {
    it("Start", function () {
      //Arange
      let fnc = function () {};
      let name = "Test Timer";
      let duration = 10;
      let color = "rgb(150, 30, 30)";
      //Act
      var timer = new Timer(name, duration, color, fnc);
      timer.Start();
      //Assert
      expect(timer.isRunning()).toBeTrue();
      timer = null;
    });
  });
});
