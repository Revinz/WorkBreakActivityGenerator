var Timer = require("../Extension/Scripts/Timer.js");

describe("Timer", function () {
  it("Timer Constructor Test", function () {
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
