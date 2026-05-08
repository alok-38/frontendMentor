const charLengthSlider = document.getElementById(
  "character-length-wrapper__slider",
);
const characterLength = document.getElementById("character-length-value");

charLengthSlider.addEventListener("input", () => {
  characterLength.textContent = charLengthSlider.value;
});

const includeUpperCase = document.getElementById("include-uppercase").checked;
const includeLowerCase = document.getElementById("include-lowercase").checked;
const includeNumbers = document.getElementById("include-numbers").checked;
const includeSymbols = document.getElementById("include-symbols").checked;

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
