function playableChord(chord, inversion) {
  // Returns ['c', 'e', 'g'] for 'c', ['e', 'g', 'c'] for 'c', 'back'
  var notes = notesForChord(chord, inversion);
  var keys = [
    "c-1", "csharp-1", "d-1", "eflat-1", "e-1", "f-1", "fsharp-1", "g-1", "aflat-1", "a-1", "bflat-1", "b-1",
    "c-2", "csharp-2", "d-2", "eflat-2", "e-2", "f-2", "fsharp-2", "g-2", "aflat-2", "a-2", "bflat-2", "b-2"
      ];
  result = [];
  note = 0;
  // find first instance of first note
  for(var i = 0; i != keys.length; ++i) {
    if (keys[i].substring(0, keys[i].length-2) === notes[note]) {
      result.push(keys[i]);
      note += 1;
      if (note > 3) break;
    }
  }
  return result;
}

var notes = [ "c", "csharp", "d", "eflat", "e", "f", "fsharp", "g", "aflat", "a", "bflat", "b" ];

function lookupNote(i) {
  return notes[i%12];
}

var inversions = {
  "root": [0,1,2],
  "middle": [2,0,1],
  "back": [1,2,0]
};

function notesForChord(chord, inversion) {
  var chord_lookup = chord.toLowerCase();
  var intervals = [0, 4, 7]; // Major Chord
  if (chord.length > 1 && chord[chord.length - 1] == "m") {
    intervals = [0, 3, 7];
    chord_lookup = chord.substr(0, chord.length-1);
  }
  // find root note
  for(var i = 0; i != notes.length; ++i) {
    if (notes[i] === chord_lookup) break;
  }
  var inversion_lookup = inversions[inversion];
  return [
    lookupNote(i+intervals[inversion_lookup[0]]),
    lookupNote(i+intervals[inversion_lookup[1]]),
    lookupNote(i+intervals[inversion_lookup[2]])
  ];
}

function calculateCircle() {
  // Circle of Fifths is all the notes, repeated in 5's
  result = [];
  for (var i = 0; i < 12; ++i) {
    result.push(notes[(i*5)%12]);
  }
  return result;
}
