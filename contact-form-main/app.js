document.addEventListener("DOMContentLoaded", () => {
  const formEl = document.getElementById("contact-form");
  const errorEls = document.querySelectorAll(".form-group__error");
  const firstNameInputEl = document.getElementById("first-name");
  const lastNameInputEl = document.getElementById("last-name");
  const emailInputEl = document.getElementById("email");

  const firstName = firstNameInputEl.value.trim();
  const lastName = lastNameInputEl.value.trim();
  const lastName = lastNameInputEl.value.trim();
  const email = emailInputEl.value.trim();

  const genralEnquiry = document.getElementById('general-enquiry');
  const supportRequest = document.getElementById('support-request');

  // Ensure errors are hidden on initial load
  errorEls.forEach((error) => {
    error.style.display = "none";
  });

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    errorEls.forEach((error) => {
      error.style.display = "flex";
    });
  });
});
