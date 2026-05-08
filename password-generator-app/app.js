const charLengthSlider = document.getElementById(
  "character-length-wrapper__slider",
);
const characterLength = document.getElementById("character-length-value");

charLengthSlider.addEventListener("input", () => {
  characterLength.textContent = charLengthSlider.value;
});

const includeUpperCaseEl = document.getElementById("include-uppercase");
const includeLowerCaseEl = document.getElementById("include-lowercase");
const includeNumbersEl = document.getElementById("include-numbers");
const includeSymbolsEl = document.getElementById("include-symbols");

const passwordStrengthLabel = document.getElementById("password-strength-text");

const strengthBars = [
  document.getElementById("strength-bar-1"),
  document.getElementById("strength-bar-2"),
  document.getElementById("strength-bar-3"),
  document.getElementById("strength-bar-4"),
];

const resetBars = () => {
  strengthBars.forEach((bar) => {
    bar.style.backgroundColor = "transparent";
    bar.style.border = "2px solid #e6e5ea";
  });
};

const checkAndDisplayPasswordStrength = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  let strength = 0;

  if (hasUpperCase) strength++;
  if (hasLowerCase) strength++;
  if (hasNumbers) strength++;
  if (hasSymbols) strength++;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Reset first
  resetBars();

  // WEAK (1 bar)
  if (strength <= 2) {
    passwordStrengthLabel.textContent = "WEAK";

    strengthBars[0].style.backgroundColor = "#f64a4a";
    strengthBars[0].style.border = "none";
  }

  // MEDIUM (2–3 bars)
  else if (strength <= 4) {
    passwordStrengthLabel.textContent = "MEDIUM";

    for (let i = 0; i < 3; i++) {
      strengthBars[i].style.backgroundColor = "#f8cd65";
      strengthBars[i].style.border = "none";
    }
  }

  // STRONG (4 bars)
  else {
    passwordStrengthLabel.textContent = "STRONG";

    for (let i = 0; i < 4; i++) {
      strengthBars[i].style.backgroundColor = "#a4ffaf";
      strengthBars[i].style.border = "none";
    }
  }
};

function generatePassword() {
  const password = Math.random().toString(36).slice(-10);
  return password;
}

const passwordGenerateBtn = document.getElementById("generate-password-button");
const passwordDisplay = document.getElementById("generated-password");

passwordGenerateBtn.addEventListener("click", () => {
  const password = generatePassword();

  passwordDisplay.value = password;

  checkAndDisplayPasswordStrength(password);
});

const copyBtn = document.getElementById("copy-password-button");
const copyMessage = document.getElementById("copy-message");

const copyContainer = document.getElementById("copy-container");

copyBtn.addEventListener("click", () => {
  const password = passwordDisplay.value;

  if (!password) return;

  navigator.clipboard
    .writeText(password)
    .then(() => {
      copyMessage.textContent = "COPIED";
      copyContainer.classList.add("wrapper__copy-container--active");

      setTimeout(() => {
        copyContainer.classList.remove("wrapper__copy-container--active");

        // clear text after fade-out
        setTimeout(() => {
          copyMessage.textContent = "";
        }, 250);
      }, 1200);
    })
    .catch((err) => {
      console.error("Copy failed:", err);
    });
});
