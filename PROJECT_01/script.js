document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".toggle");
  const slideBar = document.querySelector(".slideBar");

  toggle.addEventListener("click", () => {
    // Toggle the active class for slideBar
    slideBar.classList.toggle("active");

    // Toggle the lines to form an X and return to normal
    const topLine = toggle.querySelector(".top_line");
    const bottomLine = toggle.querySelector(".bottom_line");
    const middleLine = toggle.querySelector(".middle_line");

    // Toggle the 'active' class on the toggle button to track its state
    toggle.classList.toggle("active");

    if (toggle.classList.contains("active")) {
      // Apply X effect
      topLine.style.transform = "translate(-50%, -50%) rotate(45deg)";
      bottomLine.style.transform = "translate(-50%, -50%) rotate(-45deg)";
      middleLine.style.opacity = "0";
    } else {
      // Revert to hamburger icon
      topLine.style.transform = "translate(-50%, -50%) rotate(0deg)";
      bottomLine.style.transform = "translate(-50%, -50%) rotate(0deg)";
      middleLine.style.opacity = "1";
    }
  });
});

// POMODORO SECTION
let workTitle = document.getElementById("work");
let breakTitle = document.getElementById("break");

// TO ADJUST TIME
let workTime = 25;
let breakTime = 5;

let seconds = "00";
let interval; // To store the setInterval reference
let isPaused = false; // To track if the timer is paused

// DISPLAY
window.onload = () => {
  document.getElementById("minutes").innerHTML = workTime;
  document.getElementById("seconds").innerHTML = seconds;

  workTitle.classList.add("active");
};

// START TIMER
function start() {
  // change buttons visibility
  document.getElementById("start").style.display = "none";
  document.getElementById("pause").style.display = "block";

  startTimer();
}

function startTimer() {
  // Set initial time
  let workMinutes = workTime - 1;
  seconds = 59;
  let breakMinutes = breakTime - 1;
  let breakCount = 0;

  // countdown function
  let timeFunction = () => {
    document.getElementById("minutes").innerHTML = workMinutes;
    document.getElementById("seconds").innerHTML = seconds;

    seconds--;

    if (seconds === 0) {
      workMinutes--;
      seconds = 59;
    }

    if (workMinutes === -1) {
      if (breakCount % 2 === 0) {
        // start break
        workMinutes = breakMinutes;
        breakCount++;
        workTitle.classList.remove("active");
        breakTitle.classList.add("active");
      } else {
        // continue work
        workMinutes = workTime - 1;
        breakCount++;
        breakTitle.classList.remove("active");
        workTitle.classList.add("active");
      }
    }
  };

  // Start the countdown
  interval = setInterval(timeFunction, 1000);
}

// PAUSE OR RESET TIMER
function pauseOrReset() {
  let pauseButton = document.getElementById("pause");
  let pauseIcon = pauseButton.querySelector("i");

  if (!isPaused) {
    clearInterval(interval); // Pause the timer
    isPaused = true;
    pauseIcon.classList.remove("fa-pause");
    pauseIcon.classList.add("fa-rotate-left"); // Change icon to reset
  } else {
    clearInterval(interval); // Reset and start again
    isPaused = false;
    pauseIcon.classList.remove("fa-rotate-left");
    pauseIcon.classList.add("fa-pause"); // Change icon back to pause
    resetTimer(); // Reset the timer and start again
  }
}

function resetTimer() {
  // Reset the display
  document.getElementById("minutes").innerHTML = workTime;
  document.getElementById("seconds").innerHTML = "00";

  startTimer(); // Restart the timer
}
