const billInputEl = document.getElementById('bill');
const peopleInputEl = document.getElementById('number');
const tipPercentButtons = document.querySelectorAll('.button-group button');
const resetButton = document.querySelector('button[type="reset"]');

const tipAmountOutput = document.getElementById('tip-amount');
const totalAmountOutput = document.getElementById('total-amount');

let selectedTipPercent = 0;

// 💡 Format as currency
const formatCurrency = (value) => `$${value.toFixed(2)}`;

// 📌 Calculate and update the outputs
function calculateTip() {
    const bill = billInputEl.valueAsNumber;
    const people = peopleInputEl.valueAsNumber;

    if (!isNaN(bill) && !isNaN(people) && people > 0 && selectedTipPercent > 0) {
        const tipTotal = (bill * selectedTipPercent) / 100;
        const tipPerPerson = tipTotal / people;
        const totalPerPerson = (bill + tipTotal) / people;

        tipAmountOutput.textContent = formatCurrency(tipPerPerson);
        totalAmountOutput.textContent = formatCurrency(totalPerPerson);
    } else {
        tipAmountOutput.textContent = '$0.00';
        totalAmountOutput.textContent = '$0.00';
    }
}

// 🖱️ Tip selection logic
tipPercentButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tipPercentButtons.forEach((b) => b.classList.remove('selected'));

        // Check if it's "Custom"
        if (btn.ariaLabel.toLowerCase() === 'custom') {
            // Prompt or handle custom logic here
            const customValue = prompt('Enter custom tip percentage:');
            const num = parseFloat(customValue);
            if (!isNaN(num) && num >= 0) {
                selectedTipPercent = num;
                btn.classList.add('selected');
            }
        } else {
            // Extract tip from aria-label (e.g., "Tip 15 percent")
            const match = btn.ariaLabel.match(/Tip (\d+)\s?percent/i);
            if (match) {
                selectedTipPercent = parseFloat(match[1]);
                btn.classList.add('selected');
            }
        }

        calculateTip();
    });
});

// 🎯 Recalculate on bill or people input
billInputEl.addEventListener('input', calculateTip);
peopleInputEl.addEventListener('input', calculateTip);

// 🔄 Reset logic
resetButton.addEventListener('click', () => {
    billInputEl.value = '';
    peopleInputEl.value = '';
    selectedTipPercent = 0;
    tipAmountOutput.textContent = '$0.00';
    totalAmountOutput.textContent = '$0.00';

    tipPercentButtons.forEach((b) => b.classList.remove('selected'));
});
