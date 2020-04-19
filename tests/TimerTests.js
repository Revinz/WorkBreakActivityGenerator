describe("Timer", function () {
  describe("Constructor", function () {
    it("Interval Timer Created", function () {
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

  describe("User Interactions", function () {
    var fnc;
    var name;
    var duration;
    var color;
    var timer;

    beforeEach(function () {
      //Setup a timer
      fnc = function () {};
      name = "Test Timer";
      duration = 10;
      color = "rgb(150, 30, 30)";
      timer = new Timer(name, duration, color, fnc);
    });

    it("Start - Should start the timer", function () {
      //Arrange

      //Act
      timer.Start();
      //Assert
      expect(timer.isRunning()).toBeTrue();
      timer = null;
    });

    it("Stop - Should stop the timer", function () {
      //Arrange
      timer.state = timer.States.RUNNING;

      //Act
      timer.Stop();

      //Assert
      expect(timer.timer).toBeNull();
      timer = null;
    });

    it("Pause - Should pause the timer", function () {
      //Arrange
      timer.state = timer.States.RUNNING;

      //Act
      timer.Pause();

      //Assert
      expect(timer.state).toBe(timer.States.PAUSED);
      timer = null;
    });
  });

  describe("Update", function () {
    var fnc;
    var name;
    var duration;
    var color;
    var timer;

    beforeEach(function () {
      //Setup a timer
      jasmine.clock().install();
      fnc = function () {};
      name = "Test Timer";
      duration = 10;
      color = "rgb(150, 30, 30)";
      timer = new Timer(name, duration, color, fnc);
    });

    afterEach(function () {
      jasmine.clock().uninstall();
    });

    it("Should decreased the remaining time by 1 every second when RUNNING", function () {
      //Arrange
      timer.state = timer.States.RUNNING;
      //Act
      jasmine.clock().tick(1001);
      //Assert
      expect(timer.timeRemaining).toBe(9);
    });

    it("Should NOT decrease the remaining time by 1 every second when PAUSED", function () {
      //Arrange
      timer.state = timer.States.PAUSED;
      //Act
      jasmine.clock().tick(1001);
      //Assert
      expect(timer.timeRemaining).toBe(10);
    });

    it("Should stop the timer when remaining time hits 0", function () {
      //Arrange
      spyOn(timer, "Stop");
      timer.state = timer.States.RUNNING;
      //Act
      jasmine.clock().tick(10001);
      //Assert
      expect(timer.Stop).toHaveBeenCalled();
    });

    it("Should call the timer's callback function when remaining time hits 0", function () {
      //Arrange
      spyOn(timer, "callback");
      timer.state = timer.States.RUNNING;
      //Act
      jasmine.clock().tick(10001);
      //Assert
      expect(timer.callback).toHaveBeenCalled();
    });
  });
});
