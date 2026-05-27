// =========================
// 🎯 ELEMENTS
// =========================
const newGameCPUBtn = document.getElementById("btn-cpu");
const newGamePlayerBtn = document.getElementById("btn-player");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const boardEl = document.getElementById("board");

const turnIndicator = document.getElementById("turn-indicator");

const modal = document.getElementById("modal-result");
const resultTitle = document.getElementById("result-title");

const nextRoundBtn = document.getElementById("next-round");
const quitBtn = document.getElementById("quit-game");

// =========================
// 🧠 GAME STATE
// =========================
let board = Array(9).fill(null);
let currentPlayer = "x";
let gameMode = "cpu";

let scores = {
  x: 0,
  o: 0,
  ties: 0
};

// =========================
// ▶️ START GAME
// =========================
newGameCPUBtn.addEventListener("click", () => startGame("cpu"));
newGamePlayerBtn.addEventListener("click", () => startGame("player"));

function startGame(mode) {
  gameMode = mode;

  menu.hidden = true;
  game.hidden = false;

  resetBoard();
}

// =========================
// 🔄 RESET BOARD
// =========================
function resetBoard() {
  board = Array(9).fill(null);
  currentPlayer = "x";
  updateTurn();
  renderBoard();
}

// =========================
// 🧱 RENDER BOARD
// =========================
function renderBoard() {
  boardEl.innerHTML = "";

  board.forEach((cell, index) => {
    const btn = document.createElement("button");
    btn.classList.add("game__cell");
    btn.dataset.cell = index;

    if (cell) {
      btn.textContent = cell.toUpperCase();
    }

    btn.addEventListener("click", () => handleMove(index));

    boardEl.appendChild(btn);
  });
}

// =========================
// 🎮 HANDLE MOVE
// =========================
function handleMove(index) {
  if (board[index]) return;

  board[index] = currentPlayer;

  if (checkWinner()) {
    handleWin();
    return;
  }

  if (board.every(cell => cell)) {
    handleTie();
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
  updateTurn();
  renderBoard();

  if (gameMode === "cpu" && currentPlayer === "o") {
    cpuMove();
  }
}

// =========================
// 🤖 CPU MOVE
// =========================
function cpuMove() {
  const emptyCells = board
    .map((val, idx) => (val === null ? idx : null))
    .filter(v => v !== null);

  const randomIndex =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  setTimeout(() => handleMove(randomIndex), 400);
}

// =========================
// 🏆 WIN CHECK
// =========================
const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

// =========================
// 🏆 HANDLE WIN
// =========================
function handleWin() {
  scores[currentPlayer]++;
  showResult(`${currentPlayer.toUpperCase()} Wins!`);
}

// =========================
// 🤝 HANDLE TIE
// =========================
function handleTie() {
  scores.ties++;
  showResult("It's a Tie!");
}

// =========================
// 🪟 SHOW RESULT MODAL
// =========================
function showResult(message) {
  resultTitle.textContent = message;
  modal.hidden = false;
}

// =========================
// 🔁 NEXT ROUND
// =========================
nextRoundBtn.addEventListener("click", () => {
  modal.hidden = true;
  resetBoard();
});

// =========================
// 🚪 QUIT GAME
// =========================
quitBtn.addEventListener("click", () => {
  modal.hidden = true;
  game.hidden = true;
  menu.hidden = false;
});

// =========================
// 🔄 TURN UI
// =========================
function updateTurn() {
  turnIndicator.textContent =
    currentPlayer === "x"
      ? "X (You)"
      : gameMode === "cpu"
      ? "O (CPU)"
      : "O (Player 2)";
}