const screenEl = document.getElementById("screen");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    screenEl.style.backgroundColor = event.target.id;
  });
});
