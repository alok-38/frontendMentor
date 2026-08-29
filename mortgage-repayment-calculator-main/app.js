const formEl = document.querySelector("form");

const mortgageAmountEl = document.getElementById("mortgage-amount");
const mortgageTermEl = document.getElementById("mortgage-term");
const interestRateEl = document.getElementById("interest-rate");

const repaymentEl = document.getElementById("repayment");
const interestEl = document.getElementById("interest-only");

const clearAllBtn = document.querySelector(
  ".mortgage-calculator__clear-button",
);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const mortgageAmountInput = mortgageAmountEl.value.trim();
  const mortgageTermInput = mortgageTermEl.value.trim();
  const interestRateInput = interestRateEl.value.trim();

  if (repaymentEl.checked) {
    console.log("Repayment selected");
  }

  if (interestEl.checked) {
    console.log("Interest Only selected");
  }
});

clearAllBtn.addEventListener("click", () => {
  mortgageAmountEl.value = "";
  mortgageTermEl.value = "";
  interestRateEl.value = "";
  repaymentEl.checked = false;
  interestEl.checked = false;
});
