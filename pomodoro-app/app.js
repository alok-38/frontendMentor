"use strict";

/* =========================================================
   CONFIG
   ========================================================= */

const DEFAULT_TIMES = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
};


/* =========================================================
   STATE
   ========================================================= */

const state = {
  mode: "pomodoro",

  durations: {
    ...DEFAULT_TIMES,
  },

  remainingSeconds: DEFAULT_TIMES.pomodoro * 60,

  isRunning: false,

  intervalId: null,
};


/* =========================================================
   DOM
   ========================================================= */

const elements = {
  time: document.querySelector("#pomodoro-time"),

  pauseButton: document.querySelector("#pomodoro-pause"),

  modeButtons: {
    pomodoro: document.querySelector("#pomodoro-mode"),
    shortBreak: document.querySelector("#short-break-mode"),
    longBreak: document.querySelector("#long-break-mode"),
  },

  settingsToggle: document.querySelector("#pomodoro-settings-toggle"),

  settings: document.querySelector("#pomodoro-settings"),

  pomodoroInput: document.querySelector("#pomodoro-setting"),
  shortBreakInput: document.querySelector("#short-break-setting"),
  longBreakInput: document.querySelector("#long-break-setting"),

  fontColorInput: document.querySelector("#font-color"),

  applyButton: document.querySelector("#pomodoro-apply"),

  timer: document.querySelector(".pomodoro__timer"),
};


/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {
  if (state.isRunning) return;

  state.isRunning = true;

  elements.pauseButton.textContent = "pause";

  state.intervalId = setInterval(() => {
    tick();
  }, 1000);
}


function pauseTimer() {
  state.isRunning = false;

  clearInterval(state.intervalId);

  state.intervalId = null;

  elements.pauseButton.textContent = "start";
}


function tick() {
  if (state.remainingSeconds <= 0) {
    completeTimer();
    return;
  }

  state.remainingSeconds--;

  updateTimerDisplay();
  updateProgress();
}


function completeTimer() {
  pauseTimer();

  state.remainingSeconds = 0;

  updateTimerDisplay();
  updateProgress();

  // Optional:
  // Move to the next mode here later.
  console.log(`${state.mode} finished!`);
}


/* =========================================================
   TIMER DISPLAY
   ========================================================= */

function updateTimerDisplay() {
  const minutes = Math.floor(state.remainingSeconds / 60);

  const seconds = state.remainingSeconds % 60;

  elements.time.textContent =
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}`;
}


/* =========================================================
   PROGRESS RING
   ========================================================= */

function updateProgress() {
  const totalSeconds =
    state.durations[state.mode] * 60;

  const progress =
    state.remainingSeconds / totalSeconds;

  const degrees = progress * 360;

  elements.timer.style.setProperty(
    "--progress",
    `${degrees}deg`
  );
}


/* =========================================================
   MODE SWITCHING
   ========================================================= */

function changeMode(mode) {
  if (!state.durations[mode]) return;

  pauseTimer();

  state.mode = mode;

  state.remainingSeconds =
    state.durations[mode] * 60;

  updateActiveMode();
  updateTimerDisplay();
  updateProgress();
}


function updateActiveMode() {
  Object.entries(elements.modeButtons).forEach(
    ([mode, button]) => {
      button.classList.toggle(
        "pomodoro__mode--active",
        mode === state.mode
      );
    }
  );
}


/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {
  elements.settings.hidden = false;
}


function closeSettings() {
  elements.settings.hidden = true;
}


function applySettings() {
  const pomodoro =
    Number(elements.pomodoroInput.value);

  const shortBreak =
    Number(elements.shortBreakInput.value);

  const longBreak =
    Number(elements.longBreakInput.value);

  if (
    !isValidDuration(pomodoro) ||
    !isValidDuration(shortBreak) ||
    !isValidDuration(longBreak)
  ) {
    alert("Please enter valid times.");

    return;
  }

  state.durations = {
    pomodoro,
    shortBreak,
    longBreak,
  };

  /*
   * Restart the currently selected mode
   * using the new duration.
   */

  pauseTimer();

  state.remainingSeconds =
    state.durations[state.mode] * 60;

  updateTimerDisplay();
  updateProgress();

  applyFontColor();

  closeSettings();
}


function isValidDuration(value) {
  return (
    Number.isFinite(value) &&
    value > 0 &&
    value <= 999
  );
}


/* =========================================================
   FONT COLOR
   ========================================================= */

function applyFontColor() {
  const color = elements.fontColorInput.value;

  document.documentElement.style.setProperty(
    "--color-blue-100",
    color
  );
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

/*
 * Start / pause
 */

elements.pauseButton.addEventListener(
  "click",
  () => {
    if (state.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }
);


/*
 * Pomodoro
 */

elements.modeButtons.pomodoro.addEventListener(
  "click",
  () => {
    changeMode("pomodoro");
  }
);


/*
 * Short break
 */

elements.modeButtons.shortBreak.addEventListener(
  "click",
  () => {
    changeMode("shortBreak");
  }
);


/*
 * Long break
 */

elements.modeButtons.longBreak.addEventListener(
  "click",
  () => {
    changeMode("longBreak");
  }
);


/*
 * Settings
 */

elements.settingsToggle.addEventListener(
  "click",
  () => {
    openSettings();
  }
);


/*
 * Apply settings
 */

elements.applyButton.addEventListener(
  "click",
  () => {
    applySettings();
  }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function init() {
  updateTimerDisplay();

  updateActiveMode();

  updateProgress();

  elements.pauseButton.textContent = "start";
}


init();