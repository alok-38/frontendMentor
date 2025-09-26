const passwordOutputEl = document.getElementById('passwordOutput');
const rangeSliderEl = document.getElementById('rangeSlider');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const copyIcon = document.querySelector('.copy-icon');
const passwordLength = document.querySelector('span');
const passwordStrengthLow = document.querySelector('.password-strength div:first-of-type');
// Get initial color from computed style (more reliable)
const passwordStrengthColor = window.getComputedStyle(passwordStrengthLow).backgroundColor;
const generatePasswordButton = document.querySelector('button');


let counter = 0;
let previousValue = parseInt(rangeSliderEl.value, 10);

const firstCheckBox = checkBoxes[0];

function updateColor() {
    const sliderValue = parseInt(rangeSliderEl.value, 10);
    if (sliderValue >= 5 && firstCheckBox.checked) {
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

    passwordLength.textContent = currentValue;
    previousValue = currentValue;

    updateColor();
});

firstCheckBox.addEventListener('change', () => {
    updateColor();
});

function generatePassword() {
    const length = parseInt(rangeSliderEl.value, 10);
    const includeUppercase = checkBoxes[0].checked;

    if (length < 5 || !includeUppercase) {
        alert("Password must be at least 5 characters long and include uppercase letters.");
        return '';
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()';

    let charPool = lowercase + numbers + symbols;
    let result = '';

    // ✅ Ensure at least one uppercase character is included
    if (includeUppercase) {
        result += getRandomChar(uppercase);
        charPool += uppercase;
    }

    // Fill remaining characters
    while (result.length < length) {
        result += getRandomChar(charPool);
    }

    // Shuffle to avoid the first character always being uppercase
    return shuffleString(result);
}

// Helper: Get random character from string
function getRandomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
}

// Fisher-Yates Shuffle (more reliable than sort+random)
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}


generatePasswordButton.addEventListener('click', () => {
    const password = generatePassword();
    if (password) {
        passwordOutputEl.value = password;
        passwordOutputEl.style.color = "#A4FFAF";
    }
});

copyIcon.addEventListener('click', async () => {
    const password = passwordOutputEl.value; // ✅ get the displayed password

    if (!password) {
        alert("No password to copy!");
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        alert("Password copied to clipboard!");
    } catch (err) {
        console.error("Copy failed", err);
        alert("Failed to copy password. Please copy it manually.");
    }
});