const formEl = document.getElementById("new-item-form");
const inputEl = document.getElementById("item-input");
const errorEl = document.getElementById("error-message");
const listEl = document.getElementById("list");
const ulEl = document.querySelector("ul");

formEl.addEventListener("submit", function (event) {
  // Prevent default form submission
  event.preventDefault();
  // Accept input value and trim white space
  let inputValue = inputEl.value.trim();
  if (!inputValue) {
    errorEl.textContent = "Please enter at-least one item";
  } else {
    const liEl = document.createElement("li");
    liEl.textContent = inputValue;
    ulEl.appendChild(liEl);
    listEl.appendChild(ulEl);
    errorEl.textContent = "";
  }
  inputEl.value = "";
});
