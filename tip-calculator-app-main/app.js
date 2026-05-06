document.addEventListener("DOMContentLoaded", () => {
  const defaults = {
    "bill-input": 0.0,
    "people-input": 0,
    "tip-amount": 0.0,
    "total-amount": 0.0,
  };

  const applyDefaults = () => {
    Object.entries(defaults).forEach(([id, value]) => {
      const el = document.getElementById(id);

      if ("value" in el) {
        el.value = value;
        el.style.textAlign = "right";
      } else {
        el.textContent = `$${value.toFixed(2)}`;
      }
    });
  };

  //   Tip calculations
  const TIP_OPTIONS = {
    5: 0.05,
    10: 0.1,
    15: 0.15,
    25: 0.25,
    50: 0.5,
  };

  const calculateTotalBill = (billAmount, tipPercent) => {
    // use a predefined tip if not use custom
    const percentage = TIP_OPTIONS[tipPercent] ?? tipPercent / 100;

    const tip = billAmount * percentage;
    return billAmount + tip;
  };

  const tipButtons = document.querySelectorAll("#tip-group button");

  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const billInput = document.getElementById("bill-input");
      const peopleInput = document.getElementById("people-input");
      const tipAmountEl = document.getElementById("tip-amount");
      const totalAmountEl = document.getElementById("total-amount");

      const billValue = parseFloat(billInput.value) || 0;
      const peopleValue = parseInt(peopleInput.value) || 1;

      const tipPercent = parseFloat(button.dataset.tip);

      const percentage = TIP_OPTIONS[tipPercent] ?? tipPercent / 100;

      const tipTotal = billValue * percentage;
      const total = billValue + tipTotal;

      // Per person values
      const tipPerPerson = tipTotal / peopleValue;
      const totalPerPerson = total / peopleValue;

      tipAmountEl.textContent = `$${tipPerPerson.toFixed(2)}`;
      totalAmountEl.textContent = `$${totalPerPerson.toFixed(2)}`;
    });
  });

  //   Make the values go away on focus
  ["bill-input", "people-input"].forEach((id) => {
    const el = document.getElementById(id);

    el.addEventListener("focus", () => {
      el.value = "";
    });
  });

  document.getElementById("tip-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  document.getElementById("reset-btn").addEventListener("click", applyDefaults);

  // run once on load
  applyDefaults();
});
