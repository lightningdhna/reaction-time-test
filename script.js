let startTime;
let totalTime = 0;
let counter = 0.0;

const reactionTest = document.getElementById("reaction-test");
const reactionTimeDisplay = document.getElementById("reaction-time");
const averageTimeDisplay = document.getElementById("average-time");
const versionDisplay = document.getElementById("version");

const version = "15/8.1"; // Define the version here

function getRandomTime() {
  return Math.floor(Math.random() * 8000) + 1000; // Random time between 2 to 7 seconds
}

function startTest() {
  // reactionTimeDisplay.textContent = '';
  setTimeout(() => {
    reactionTest.style.backgroundColor = "green";
    startTime = performance.now();
    if (navigator.vibrate && isMobileDevice()) {
      navigator.vibrate(200);
      reactionTest.style.backgroundColor = "black";
    } else {
      reactionTest.style.backgroundColor = "yellow";
    }
  }, getRandomTime());
}

async function handleClick() {
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
document.addEventListener("keydown", handleClick);

startTest();

versionDisplay.textContent = `Version: ${version}`;
