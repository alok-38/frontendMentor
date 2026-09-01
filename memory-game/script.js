const board = document.querySelector("#board");
const timeEl = document.querySelector("#time");
const movesEl = document.querySelector("#moves");
const setupBackdrop = document.querySelector("#setupBackdrop");
const modalBackdrop = document.querySelector("#modalBackdrop");
const finalTime = document.querySelector("#finalTime");
const finalMoves = document.querySelector("#finalMoves");

let theme = "numbers";
let gridSize = 4;
let players = 1;
let deck = [];
let first = null;
let second = null;
let lock = false;
let moves = 0;
let seconds = 0;
let timer = null;
let matched = 0;

const iconSet = ["★","●","▲","◆","♥","☀","☾","✿","⚡","♣","♠","♫","☘","✦","⬟","☯","☮","∞"];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function formatTime(value) {
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function updateStats() {
  timeEl.textContent = formatTime(seconds);
  movesEl.textContent = moves;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    seconds++;
    updateStats();
  }, 1000);
}

function buildDeck() {
  const pairs = (gridSize * gridSize) / 2;
  const source = theme === "numbers"
    ? Array.from({ length: pairs }, (_, i) => i + 1)
    : iconSet.slice(0, pairs);
  deck = shuffle([...source, ...source]);
}

function renderBoard() {
  board.className = `board size-${gridSize}`;
  board.innerHTML = "";
  deck.forEach((value, index) => {
    const card = document.createElement("button");
    card.className = "card";
    card.dataset.value = value;
    card.dataset.index = index;
    card.setAttribute("aria-label", "Hidden card");
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function resetStats() {
  moves = 0; seconds = 0; matched = 0;
  first = null; second = null; lock = false;
  updateStats();
}

function newGame() {
  resetStats();
  buildDeck();
  renderBoard();
  setupBackdrop.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
  startTimer();
}

function flipCard(card) {
  if (lock || card === first || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.value;
  card.setAttribute("aria-label", `Card ${card.dataset.value}`);

  if (!first) {
    first = card;
    return;
  }

  second = card;
  moves++;
  updateStats();
  lock = true;

  if (first.dataset.value === second.dataset.value) {
    first.classList.add("matched");
    second.classList.add("matched");
    matched += 2;
    resetTurn();
    if (matched === deck.length) finishGame();
  } else {
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.textContent = "";
      second.textContent = "";
      first.setAttribute("aria-label", "Hidden card");
      second.setAttribute("aria-label", "Hidden card");
      resetTurn();
    }, 700);
  }
}

function resetTurn() {
  first = null; second = null; lock = false;
}

function finishGame() {
  clearInterval(timer);
  setTimeout(() => {
    finalTime.textContent = formatTime(seconds);
    finalMoves.textContent = `${moves} ${moves === 1 ? "move" : "moves"}`;
    modalBackdrop.classList.remove("hidden");
  }, 350);
}

document.querySelector("#startGame").addEventListener("click", newGame);
document.querySelector("#restartTop").addEventListener("click", newGame);
document.querySelector("#restartModal").addEventListener("click", newGame);
document.querySelector("#newGame").addEventListener("click", () => {
  modalBackdrop.classList.add("hidden");
  setupBackdrop.classList.remove("hidden");
});

document.querySelectorAll("[data-theme]").forEach(btn => {
  btn.addEventListener("click", () => {
    theme = btn.dataset.theme;
    document.querySelectorAll("[data-theme]").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.querySelectorAll("[data-players]").forEach(btn => {
  btn.addEventListener("click", () => {
    players = Number(btn.dataset.players);
    document.querySelectorAll("[data-players]").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.querySelectorAll("[data-size]").forEach(btn => {
  btn.addEventListener("click", () => {
    gridSize = Number(btn.dataset.size);
    document.querySelectorAll("[data-size]").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Start with a preview deck behind the setup screen.
buildDeck();
renderBoard();
updateStats();
