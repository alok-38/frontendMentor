const passwordOutputEl = document.getElementById('passwordOutput');
const rangeSliderEl = document.getElementById('rangeSlider');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const copyIcon = document.querySelector('.copy-icon');
const passwordLength = document.querySelector('span');
const passwordStrengthLow = document.querySelector('.password-strength div:first-of-type');
// Get initial color from computed style (more reliable)
const passwordStrengthColor = window.getComputedStyle(passwordStrengthLow).backgroundColor;

let counter = 0;
let previousValue = parseInt(rangeSliderEl.value, 10);

const firstCheckBox = checkBoxes[0];

function updateColor() {
    
    if (counter >= 5 && firstCheckBox.checked) {
        passwordStrengthLow.style.backgroundColor = "#A4FFAF";
    } else {
        passwordStrengthLow.style.backgroundColor = passwordStrengthColor;
    }
}

rangeSliderEl.addEventListener('input', () => {
    const currentValue = parseInt(rangeSliderEl.value, 10);

    if (currentValue > previousValue) {
        counter++;
    } else if (currentValue < previousValue) {
        counter--;
    }

    passwordLength.textContent = counter;
    previousValue = currentValue;

    updateColor();
});

firstCheckBox.addEventListener('change', () => {
    updateColor();
});