const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('number');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const tipButtonGroup = document.querySelectorAll('fieldset button');
const customTipInput = document.getElementById('custom-tip');
const resetButton = document.querySelector('button[type="reset"]');
const billLabel = document.querySelector('label[for="bill"]');
const numberLabel = document.querySelector('label[for="number"]');

// Common function to calculate and update the UI
function calculateTip(tipPercent) {
    const billValue = parseFloat(billInput.value.trim());
    const peopleValue = parseInt(peopleInput.value.trim());

    if (isNaN(billValue) || isNaN(peopleValue) || peopleValue <= 0) {
        billLabel.textContent = "Bill amount required";
        numberLabel.textContent = "Enter the number of people";
        billLabel.style.color = "red";
        numberLabel.style.color = "red";
        return;
    } else {
        billLabel.textContent = "Bill";
        numberLabel.textContent = "Number of People";
        billLabel.style.color = "#5E7A7D";
        numberLabel.style.color = "#5E7A7D";
    }

    const tipTotal = billValue * tipPercent;
    const tipPerPerson = tipTotal / peopleValue;
    const totalPerPerson = (billValue + tipTotal) / peopleValue;

    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Handle preset tip buttons
tipButtonGroup.forEach((button) => {
    button.addEventListener('click', () => {
        const tipPercentText = button.textContent.replace('%', '');
        const tipPercent = parseFloat(tipPercentText) / 100;
        calculateTip(tipPercent);
    });
});

// Handle custom tip input
customTipInput.addEventListener('input', () => {
    const customValue = parseFloat(customTipInput.value.trim());
    if (!isNaN(customValue) && customValue >= 0) {
        const tipPercent = customValue / 100;
        calculateTip(tipPercent);
    }
});


resetButton.addEventListener('click', () => {
    tipAmount.value = "$0.00";
    totalAmount.value = "$0.00";
    billInput.value = "";
    peopleInput.value = "";
    billLabel.textContent = "Bill";
    billLabel.style.color = "#5E7A7D";
    numberLabel.textContent = "Number of People";
    numberLabel.style.color = "#5E7A7D";
})