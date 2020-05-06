describe("Activity Generator", function () {
  it("Should generate valid activity for given break", function () {
    let activities = [];
    let piano = new Activity("Piano");
    piano.AddAllowedBreak(Phases.BREAK);
    activities.push(piano);

    let a = RandomBreakActivity(Phases.BREAK, activities);

    expect(a.AllowedBreaks).toContain(Phases.BREAK);
  });

  it("Should return error if activity list is empty", function () {
    let activities_empty = [];
    let a = RandomBreakActivity(Phases.BREAK, activities_empty);

    expect(a).toBeInstanceOf(Error);
  });
});
