const main = document.getElementById("mainContent");
const formHTML = main.innerHTML;

// Simple email regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener("submit", function (e) {
  if (e.target.matches(".signup__form")) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    // Remove previous error if any
    let errorMsg = document.querySelector(".error-message");
    if (errorMsg) errorMsg.remove();

    if (!isValidEmail(email)) {
      // Show error message
      const error = document.createElement("p");
      error.textContent = "Valid email required";
      error.classList.add("error-message");

      emailInput.classList.add("input-error");
      emailInput.parentElement.appendChild(error);

      return; // stop execution
    }

    // If valid → show success screen
    main.innerHTML = `
      <section class="signup signup--success">
        <h2 class="signup__title signup__title--success">
          Thanks for subscribing!
        </h2>

        <p class="signup__message">
          A confirmation email has been sent to <strong>${email}</strong>.
          Please open it and click the button inside to confirm your subscription.
        </p>

        <button id="dismissBtn" class="signup__button signup__button--secondary">
          Dismiss message
        </button>
      </section>
    `;
  }
});

document.addEventListener("click", function (e) {
  if (e.target.id === "dismissBtn") {
    main.innerHTML = formHTML;
  }
});
