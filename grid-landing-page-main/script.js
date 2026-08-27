const buttons = document.querySelectorAll(".nav__toggle");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button === buttons[0]) {
      console.log("Open button");
    } else {
      console.log("Close button");
    }
  });
});
