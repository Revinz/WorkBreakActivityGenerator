describe("Activity", function () {
  it("Should Create Activity", function () {
    let a = new Activity("Test");

    expect(a).toBeDefined();
  });

  it("Should return error when creating activity without name", function () {
    let a = new Activity();

    expect(a).toBeInstanceOf(Error);
  });

  it("Should return error when creating activity with empty string", function () {
    let a = new Activity("");

    expect(a).toBeInstanceOf(Error);
  });

  it("Should rename activity", function () {
    let a = new Activity("Test A");

    a.Rename("Test B");

    expect(a.name).toBe("Test B");
  });

  it("Should add break to 'allowed breaks'", function () {
    let a = new Activity("Test A");

    a.AddAllowedBreak(Phases.BREAK);

    expect(a.AllowedBreaks).toContain(Phases.BREAK);
  });

  it("Should not add a non-break phase to 'allowed breaks'", function () {
    let a = new Activity("Test A");

    a.AddAllowedBreak(Phases.BREAK);

    expect(a.AllowedBreaks).not.toContain(Phases.FOCUS);
  });

  it("Should remove activity from settings when deleted", function () {
    fail("Not implemented");
  });
});
