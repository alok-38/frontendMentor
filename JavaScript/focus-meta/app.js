const allButtons = document.querySelectorAll('.buttons button');
const themeToggleEls = document.querySelectorAll('.theme--toggle > *');
let timeEl = document.querySelector('h1');
let countdown = parseInt(timeEl.textContent); // initial time

// First button = play
const playButton = allButtons[0];
const playIcon = playButton.querySelector('img');

// Second button = reset
const resetButton = allButtons[1];

// timer function
let timerId = null;
let totalSeconds = 25 * 60; // 25 minutes

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timerId !== null) return; // prevent multiple intervals

    timerId = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            playButton.classList.remove('is-playing');
            playIcon.src = 'assets/img/play-circle 1.png';
            playIcon.alt = 'play';
        }
    }, 1000);
}

function resetTimer() {
    stopTimer();                    // Stop the countdown
    totalSeconds = 25 * 60;        // Reset to 25 minutes
    updateDisplay();               // Update the display to show "25:00"

    // Optional: reset play button UI
    playButton.classList.remove('is-playing');
    playIcon.src = 'assets/img/play-circle 1.png';
    playIcon.alt = 'play';
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}

playButton.addEventListener('click', () => {
    playButton.classList.toggle('is-playing');

    if (playButton.classList.contains('is-playing')) {
        playIcon.src = 'assets/img/pause_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
        playIcon.alt = 'pause';
        startTimer();
    } else {
        playIcon.src = 'assets/img/play-circle 1.png';
        playIcon.alt = 'play';
        stopTimer();
    }
});

// Initial render of the timer
updateDisplay();
// Dark mode toggle
const toggleSwitch = document.querySelector('.toggle--switch');
const toggleInput = toggleSwitch.querySelector('input[type="checkbox"]');

// Set initial state
document.body.classList.add('light'); // or read from storage/localStorage if preferred
toggleInput.checked = false; // light mode = unchecked

// Handle toggle
toggleInput.addEventListener('change', () => {
    document.body.classList.toggle('dark', toggleInput.checked);
    document.body.classList.toggle('light', !toggleInput.checked);
});


resetButton.addEventListener('click', () => {
    resetTimer();
});

// skip timer
let isWorkSession = true; // true = work session, false = break session
const skipButton = document.querySelector('[aria-label="Skip"]');

skipButton.addEventListener('click', () => {
    stopTimer(); // Stop the current timer

    // Move to the next phase (e.g., from work to break)
    if (isWorkSession) {
        totalSeconds = 5 * 60; // short break
        isWorkSession = false;
    } else {
        totalSeconds = 25 * 60; // back to work
        isWorkSession = true;
    }

    updateDisplay();
    // Optional: auto-start next session
    startTimer();
});
