let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let running = false;
let paused = false;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');
const laps = document.getElementById('laps');
const lapsContainer = document.getElementById('laps-container');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseResumeTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        paused = false;
        startButton.disabled = true;
        pauseButton.classList.remove('hidden');
        resetButton.classList.remove('hidden');
        lapButton.classList.remove('hidden');
    }
}

function pauseResumeTimer() {
    if (!paused) {
        clearInterval(tInterval);
        savedTime = difference;
        paused = true;
        pauseButton.textContent = 'Resume';
    } else {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        paused = false;
        pauseButton.textContent = 'Pause';
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    startButton.disabled = false;
    pauseButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    lapButton.classList.add('hidden');
    pauseButton.textContent = 'Pause';
    savedTime = 0;
    difference = 0;
    display.textContent = '00:00:00.00';
    laps.innerHTML = '';
    lapsContainer.style.display = 'none'; // Hide the laps container on reset
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = (hours < 10 ? '0' : '') + hours + ':' +
                          (minutes < 10 ? '0' : '') + minutes + ':' +
                          (seconds < 10 ? '0' : '') + seconds + '.' +
                          (milliseconds < 10 ? '0' : '') + milliseconds;
}

function recordLap() {
    if (display.textContent !== '00:00:00.00') {
        lapsContainer.style.display = 'block'; // Show the laps container when a lap is recorded
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
        lapsContainer.scrollTop = lapsContainer.scrollHeight; // Scroll to the bottom
    }
}
