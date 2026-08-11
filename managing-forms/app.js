const formEl = document.getElementById("form");
const inputEl = document.querySelectorAll("input");
const submitButton = document.querySelector("button");

const nameErrorEl = document.getElementById("name-error");
const emailErrorEl = document.getElementById("email-error");
const passwordErrorEl = document.getElementById("password-error");
const confirmPasswordEl = document.getElementById("confirm-password-error");

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  inputEl.forEach((input) => {
    switch (input.id) {
      case "name":
        if (input.value.trim() === "") {
          nameErrorEl.textContent = "Name cannot be empty";
        }
        break;

      case "email":
        if (input.value.trim() === "") {
          emailErrorEl.textContent = "Email cannot be empty";
        }
        break;
      case "password":
        if (input.value.trim() === "") {
          passwordErrorEl.textContent = "password cannot be empty";
        }
        break;
      case "confirm-password":
        if (input.value.trim() === "") {
          confirmPasswordEl.textContent = "password cannot be empty";
        }
        break;

      default:
        break;
    }
  });

  // Reset form after submitting
  event.target.reset();
}

formEl.addEventListener("submit", handleSubmit);
