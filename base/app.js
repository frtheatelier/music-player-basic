var x = document.getElementById('music-audio');
var playBtn = document.getElementById('m-play');
var pauseBtn = document.getElementById('m-pause');

var currDur = document.getElementById('curr-duration');
var totalDur = document.getElementById('m-duration');
var seekInput = document.getElementById('m-seek');

let updateDur;

console.log(x.currentTime);
currDur.innerHTML = x.currentTime;

while (!x.paused) {
  currDur.innerHTML = x.currentTime;
}

function playAudio() {
  if (x.paused) {
    x.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
  } else {
    x.pause();
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
  }
}

// toughengineer
function updateProgress() {
  seekInput.style.setProperty("--value", seekInput.value);
  seekInput.style.setProperty(
    "--min",
    seekInput.min == "" ? "0" : seekInput.min,
  );
  seekInput.style.setProperty(
    "--max",
    seekInput.max == "" ? "100" : seekInput.max,
  );
  seekInput.addEventListener("input", () =>
    seekInput.style.setProperty("--value", seekInput.value),
  );
}

// updateProgress();

// g4g
updateDur = setInterval(seekUpdate, 1000);

function seekUpdate() {
  let seekPos = 0

  // Check if the current track duration is a legible number
  if (!isNaN(x.duration)) {
    seekPos = x.currentTime * (100 / x.duration);
    seekInput.value = seekPos;

    updateProgress();

    // Calculate the time left and the total duration
    let currMin = Math.floor(x.currentTime / 60);
    let currSec = Math.floor(x.currentTime - currMin * 60);
    let durMin = Math.floor(x.duration / 60);
    let durSec = Math.floor(x.duration - durMin * 60);

    // Add a zero to the single digit time values
    if (currSec < 10) {
      currSec = '0' + currSec;
    }
    if (durSec < 10) {
      durSec = '0' + durSec;
    }
    if (currMin < 10) {
      currMin = '0' + currMin;
    }
    if (durMin < 10) {
      durMin = '0' + durMin;
    }

    // Display the updated duration
    currDur.textContent = currMin + ':' + currSec;
    totalDur.textContent = durMin + ':' + durSec;
  }
}

function seekTo() {
  let seekto = x.duration * (seekInput.value / 100);
  x.currentTime = seekto;
  updateProgress();
}
