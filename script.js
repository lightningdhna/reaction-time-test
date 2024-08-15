let startTime;
let totalTime = 0;
let counter = 0.0;
let userInteracted = false;

const reactionTest = document.getElementById("reaction-test");
const reactionTimeDisplay = document.getElementById("reaction-time");
const averageTimeDisplay = document.getElementById("average-time");
const versionDisplay = document.getElementById("version");

const version = "15/8.3"; // Define the version here

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function getRandomTime() {
  return Math.floor(Math.random() * 8000) + 1000; // Random time between 1 to 9 seconds
}

function playBeep() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "square"; // Use a square wave for a more noticeable beep
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // 1000 Hz frequency for a higher-pitched beep
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(
    0.00001,
    audioContext.currentTime + 0.1
  ); // Beep duration is 0.1 seconds
  oscillator.stop(audioContext.currentTime + 0.1);
}

function startTest() {
  setTimeout(() => {
    reactionTest.style.backgroundColor = "green";
    startTime = performance.now();
    playBeep(); // Play the beep sound

    if ("vibrate" in navigator) {
      navigator.vibrate(500);
    } else {
      reactionTest.style.backgroundColor = "black";
    }
  }, getRandomTime());
}

async function handleClick() {
  userInteracted = true; // Set the flag when the user interacts
  if (reactionTest.style.backgroundColor === "green") {
    reactionTest.style.backgroundColor = "red";

    const endTime = performance.now();
    const reactionTime = endTime - startTime;
    totalTime += reactionTime;
    counter += 1.0;

    startTest();

    reactionTimeDisplay.textContent = `Reaction Time: ${reactionTime.toFixed(
      2
    )} ms`;
    averageTimeDisplay.textContent = `Average Time: ${(
      totalTime / counter
    ).toFixed(2)} ms`;
  }
}

reactionTest.addEventListener("touchstart", handleClick);
reactionTest.addEventListener("mousedown", handleClick);
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    handleClick();
  }
});

startTest();

// Update the footer with the version
versionDisplay.textContent = `Version: ${version}`;
