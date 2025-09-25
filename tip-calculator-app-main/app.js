const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('number');
const formEl = document.querySelector('form');
const resetButton = document.querySelector('button[type="reset"');
const tipButtonGroup = document.querySelectorAll('fieldset button');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    let billValue = billInput.value.trim();
    let peopleValue = peopleInput.value.trim();
    tipButtonGroup.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.textContent === '5%') {
                let total = 5 / 100 * (billValue / peopleValue);
                totalAmount.textContent = total;
            }
        })
    })
})