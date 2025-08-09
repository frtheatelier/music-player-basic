var x = document.getElementById("music-audio");
var playBtn = document.getElementById("m-play");
var pauseBtn = document.getElementById("m-pause");

var currDur = document.getElementById("curr-duration");
var totalDur = document.getElementById("m-duration");
var seekInput = document.getElementById("m-seek");

let updateDur;

console.log(x.currentTime);
currDur.innerHTML = x.currentTime;

while (!x.paused) {
  currDur.innerHTML = x.currentTime;
}

function playAudio() {
  if (x.paused) {
    x.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
  } else {
    x.pause();
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";
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
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(x.duration)) {
    seekPosition = x.currentTime * (100 / x.duration);
    seekInput.value = seekPosition;

    updateProgress();

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(x.currentTime / 60);
    let currentSeconds = Math.floor(x.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(x.duration / 60);
    let durationSeconds = Math.floor(x.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    currDur.textContent = currentMinutes + ":" + currentSeconds;
    totalDur.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function seekTo() {
  let seekto = x.duration * (seekInput.value / 100);
  // Set the current track position to the calculated seek position
  x.currentTime = seekto;
  updateProgress();
}

// https://youtu.be/iLmBy-HKIAw?si=zYovmIyR6e2XzgwY

// const autoscrollers = document.querySelectorAll(".autoscroll");

// Triggers animation if browser does not opt for reduced motion
// But I am Lazy atm sorry ;;;
// if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//   addAnimation();
// }

// function addAnimation() {
//   autoscrollers.forEach((autoscroll) => {
//     autoscroll.setAttribute("data-animated", true)
//   });
// }
