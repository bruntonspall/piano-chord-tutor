function hideNotes(keyboard) {
  var svgDoc = keyboard.getSVGDocument();
  var el = svgDoc.getElementById("notes");
  var a = el.querySelectorAll('*');
  for (var i = 0; i != a.length; i++) {
    a[i].style.opacity = 0;
  }
}

function showNote(keyboard, note) {
  var svgDoc = keyboard.getSVGDocument();
  var el = svgDoc.getElementById("note-"+note);
  if (el) el.style.opacity = 100;
}

function showChord(keyboard, chord, inversion) {
  console.log("Playing "+chord+" "+inversion);
  hideNotes(keyboard);
  if (inversion === null) inversion = "root";
  var title = keyboard.parentElement.querySelector("h2");
  if (title) title.innerHTML = chord+" "+inversion;
  var notes = playableChord(chord, inversion);
  for (var i = 0; i != notes.length; i++) {
    showNote(keyboard, notes[i]);
  }
}

var currentNote = 0;
function playNote(keyboard) {
  var nextNote = circle[currentNote];
  showChord(keyboard, nextNote, currentNote % 2 === 0? "root": "middle");
  if (++currentNote == circle.length) currentNote = 0; 
  keyboard.querySelector("#next_chord").innerHTML = "Next: "+circle[currentNote]+" "+(currentNote % 2 === 0? "root": "middle");
}

var playing = false;
var g_keyboard = null;

function startCircle() {
  var btn = document.getElementById("play");
  if (!playing) {
    playing = window.setInterval(function() {playNote(g_keyboard);}, 2500);
    btn.innerHTML = "Stop";
  } else {
    window.clearInterval(playing);
    playing = false;
    currentNote = 0;
    btn.innerHTML = "Play";
  }
}

function createKeyboard() {
  var container = document.createElement("div");
  container.classList.add("keyboard-block");
  var header = document.createElement("h2");
  container.appendChild(header);
  var keyboard = document.createElement("object");
  keyboard.type = "image/svg+xml";
  keyboard.data = "keyboard.svg";
  container.appendChild(keyboard);
  return container;
}

function showCircle() {
  var placement = document.getElementById("placement");
  var circle = calculateCircle();
  for (var i = 0; i != circle.length; ++i) {
    var chord = circle[(i+8)%circle.length];
    var new_kbd_div = createKeyboard();
    var new_kbd = new_kbd_div.querySelector("object");
    new_kbd.id = "chord-"+i;
    /* jshint loopfunc: true */
    (function(_kbd, _chord, _i) {
      new_kbd.addEventListener("load", function() {
        showChord(_kbd, _chord, _i % 2 === 0? "root": "middle"); 
      });
    })(new_kbd, chord, i);
    placement.appendChild(new_kbd_div);
  }
}

