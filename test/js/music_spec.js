describe("chords are made of notes", function() {
  it("a simple chord would be C Major", function() {
    expect(notesForChord("c", "root")).toEqual(["c", "e", "g"]);
  });
  it("can handle sharps", function() {
    expect(notesForChord("fsharp", "root")).toEqual(["fsharp", "bflat", "csharp"]);
  });
  it("allows inversions to control order", function() {
    expect(notesForChord("g", "root")).toEqual(["g", "b", "d"]);
    expect(notesForChord("g", "back")).toEqual(["b", "d", "g"]);
    expect(notesForChord("g", "middle")).toEqual(["d", "g", "b"]);
  });
  it("allows minor chords to be constructed", function() {
    expect(notesForChord("b", "root")).toEqual(["b", "eflat", "fsharp"]);
    expect(notesForChord("bm", "root")).toEqual(["b", "d", "fsharp"]);
    expect(notesForChord("fsharpm", "root")).toEqual(["fsharp", "a", "csharp"]);
  });
});
