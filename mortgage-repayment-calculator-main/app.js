const mortgageEl = document.getElementById('mortgage-amount');
const mortgageTermEl = document.getElementById('mortgage-term');
const interestRateEl = document.getElementById('interest-rate');
const formEl = document.querySelector('form');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const mortgageInput = parseFloat(mortgageEl.value);
    const mortgageAmount = Number(mortgageInput.toFixed(2));
    const mortgageTerm = parseInt(mortgageTermEl.value);
    const interestInput = parseFloat(interestRateEl.value);
    const interestRate = Number(interestInput.toFixed(2));

    const selectedType = document.querySelector('input[name="mortgage-type"]:checked')?.value;

    if (!selectedType) {
        alert('Please select a mortgage type.');
        return;
    }

    console.log(`Selected mortgage type: ${selectedType}`);
});
