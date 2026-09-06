const calculatorForm = document.getElementById("calculator-form");

const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");

const tipButtons = document.querySelectorAll(".calculator__tip-button");
const customTipInput = document.querySelector(".calculator__custom-tip-input");

const tipAmountOutput = document.getElementById("tip-amount");
const totalAmountOutput = document.getElementById("total-amount");

let selectedTip = 0;

function updateTipSelection(selectedButton) {
  tipButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button === selectedButton);
  });
}

function calculate() {
  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);

  if (bill <= 0 || people <= 0) {
    tipAmountOutput.textContent = "$0.00";
    totalAmountOutput.textContent = "$0.00";
    return;
  }

  const tip = bill * (selectedTip / 100);
  const tipPerPerson = tip / people;

  const total = bill + tip;
  const totalPerPerson = total / people;

  tipAmountOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
}

billInput.addEventListener("input", calculate);

peopleInput.addEventListener("input", calculate);

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedTip = Number(button.value);

    updateTipSelection(button);

    calculate();
  });
});

customTipInput.addEventListener("input", () => {
  selectedTip = Number(customTipInput.value);

  updateTipSelection(null);

  calculate();
});

calculatorForm.addEventListener("reset", () => {
  selectedTip = 0;

  updateTipSelection(null);

  tipAmountOutput.textContent = "$0.00";
  totalAmountOutput.textContent = "$0.00";
});
