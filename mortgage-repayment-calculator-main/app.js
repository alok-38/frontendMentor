const formEl = document.querySelector("form");

const mortgageAmountEl = document.getElementById("mortgage-amount");
const mortgageTermEl = document.getElementById("mortgage-term");
const interestRateEl = document.getElementById("interest-rate");

const repaymentEl = document.getElementById("repayment");
const interestEl = document.getElementById("interest-only");

const clearAllBtn = document.querySelector(
  ".mortgage-calculator__clear-button",
);

const warningEl = document.createElement("p");
warningEl.textContent = "This field is required";
warningEl.style.color = "#d73328";
warningEl.style.display = "none";

formEl.appendChild(warningEl);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  warningEl.style.display = "none";

  const mortgageAmount = mortgageAmountEl.value.trim();
  const mortgageTerm = mortgageTermEl.value.trim();
  const interestRate = interestRateEl.value.trim();

  // Required fields
  if (!mortgageAmount || !mortgageTerm || !interestRate) {
    warningEl.style.display = "block";
    return;
  }

  // Mortgage type
  if (!repaymentEl.checked && !interestEl.checked) {
    warningEl.style.display = "block";
    return;
  }

  // Get values as numbers
  const amount = Number(mortgageAmount);
  const term = Number(mortgageTerm);
  const rate = Number(interestRate);

  // Basic number validation
  if (Number.isNaN(amount) || Number.isNaN(term) || Number.isNaN(rate)) {
    warningEl.textContent = "Please enter valid numbers";
    warningEl.style.display = "block";
    return;
  }

  // Mortgage type
  if (repaymentEl.checked) {
    console.log("Repayment selected");
  }

  if (interestEl.checked) {
    console.log("Interest Only selected");
  }

  console.log({
    amount,
    term,
    rate,
  });
});

clearAllBtn.addEventListener("click", () => {
  mortgageAmountEl.value = "";
  mortgageTermEl.value = "";
  interestRateEl.value = "";

  repaymentEl.checked = false;
  interestEl.checked = false;

  warningEl.textContent = "All fields are required";
  warningEl.style.display = "none";
});
