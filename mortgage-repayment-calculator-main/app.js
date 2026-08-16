const form = document.getElementById("mortgage-form");

const emptyResults = document.querySelector(
  ".mortgage-calculator__empty-results",
);

const completedResults = document.querySelector(
  ".mortgage-calculator__completed-results",
);

const monthlyRepayment = document.getElementById("monthly-repayment");
const totalRepayment = document.getElementById("total-repayment");

const clearButton = document.querySelector(
  ".mortgage-calculator__clear-button",
);

// Format numbers as currency
function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Calculate mortgage repayment
function calculateRepayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  // Interest-free mortgage
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  // Standard mortgage repayment formula
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const mortgageAmount = Number(
    document.getElementById("mortgage-amount").value,
  );

  const mortgageTerm = Number(document.getElementById("mortgage-term").value);

  const interestRate = Number(document.getElementById("interest-rate").value);

  const mortgageType = document.querySelector(
    'input[name="mortgageType"]:checked',
  );

  // Let the browser handle required-field validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!mortgageType) {
    return;
  }

  let monthly;
  let total;

  if (mortgageType.value === "repayment") {
    monthly = calculateRepayment(mortgageAmount, interestRate, mortgageTerm);

    total = monthly * mortgageTerm * 12;
  } else {
    // Interest-only mortgage
    monthly = mortgageAmount * (interestRate / 100 / 12);

    total = monthly * mortgageTerm * 12 + mortgageAmount;
  }

  // Display results
  monthlyRepayment.textContent = formatCurrency(monthly);
  totalRepayment.textContent = formatCurrency(total);

  emptyResults.style.display = "none";
  completedResults.style.display = "block";
});

// Clear calculator
clearButton.addEventListener("click", function () {
  form.reset();

  monthlyRepayment.textContent = "";
  totalRepayment.textContent = "";

  completedResults.style.display = "none";
  emptyResults.style.display = "flex";
});
