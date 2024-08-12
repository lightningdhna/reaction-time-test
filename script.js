let startTime;
let reactionTimes = [];

const reactionTest = document.getElementById('reaction-test');
const message = document.getElementById('message');
const reactionTimeDisplay = document.getElementById('reaction-time');
const averageTimeDisplay = document.getElementById('average-time');

function getRandomTime() {
    return Math.floor(Math.random() * 5000) + 2000; // Random time between 2 to 7 seconds
}

function startTest() {
    reactionTest.style.backgroundColor = 'red';
    message.textContent = 'Wait for green...';
    reactionTimeDisplay.textContent = '';
    setTimeout(() => {
        reactionTest.style.backgroundColor = 'green';
        message.textContent = 'Click!';
        startTime = new Date().getTime();
    }, getRandomTime());
}

reactionTest.addEventListener('click', () => {
    if (reactionTest.style.backgroundColor === 'green') {
        const endTime = new Date().getTime();
        const reactionTime = endTime - startTime;
        reactionTimes.push(reactionTime);
        const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;

        reactionTimeDisplay.textContent = `Reaction Time: ${reactionTime} ms`;
        averageTimeDisplay.textContent = `Average Time: ${averageTime.toFixed(2)} ms`;

        startTest();
    }
});

startTest();