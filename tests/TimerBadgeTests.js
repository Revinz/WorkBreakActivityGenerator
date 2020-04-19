describe("Timer Badge", function () {
  describe("Badge Text Formatting", function () {
    [
      [10, "10s"],
      [29, "< 30s"],
      [59, "< 1m"],
      [3599, "59m"],
      [4800, "1:20h"],
    ].forEach(([Time, expectedOutput]) => {
      it(`Should format time ${Time} as "${expectedOutput}"`, () => {
        var badge = new TimerBadge();

        expect(badge.formatTime(Time)).toBe(expectedOutput);
      });
    });
  });

  describe("Update", function () {
    var fnc;
    var name;
    var duration;
    var color;
    var timer;

    beforeEach(function () {
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

    it("Should be updated every second", function () {
      //Arrange
      spyOn(timer.badge, "UpdateBadge");
      //Act
      jasmine.clock().tick(1001);
      //Assert
      expect(timer.badge.UpdateBadge).toHaveBeenCalled();
    });

    it("Should show remaining time when timer is running", function () {
      //Arrange
      let isRunning = true;
      let duration = timer.timeRemaining;
      //Act
      timer.badge.UpdateBadge(isRunning, duration);
      //Assert
      expect(timer.badge.badgeText).toBe("10s");
    });

    it("Should show '__' when timer is paused", function () {
      //Arrange
      let isRunning = false;
      let duration = timer.timeRemaining;
      //Act
      timer.badge.UpdateBadge(isRunning, duration);
      //Assert
      expect(timer.badge.badgeText).toBe("__");
    });
  });
});
