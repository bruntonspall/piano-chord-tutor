describe("chords are made of notes", function() {
  it("a simple chord would be C Major", function() {
    expect(notesForChord("c", "root")).toEqual(["c", "e", "g"]);
  });
  it("allows inversions to control order", function() {
    expect(notesForChord("g", "root")).toEqual(["g", "b", "d"]);
    expect(notesForChord("g", "back")).toEqual(["b", "d", "g"]);
    expect(notesForChord("g", "middle")).toEqual(["d", "g", "b"]);
  });
});
