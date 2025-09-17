const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const digits = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?/`~';

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const useUpper = document.getElementById('uppercase').checked;
    const useLower = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    let charPool = '';
    let guaranteed = [];

    if (useUpper) {
        charPool += upper;
        guaranteed.push(randomChar(upper));
    }
    if (useLower) {
        charPool += lower;
        guaranteed.push(randomChar(lower));
    }
    if (useNumbers) {
        charPool += digits;
        guaranteed.push(randomChar(digits));
    }
    if (useSymbols) {
        charPool += symbols;
        guaranteed.push(randomChar(symbols));
    }

    if (charPool.length === 0) {
        document.getElementById('result').textContent = 'Please select at least one character type.';
        document.getElementById('strength').textContent = '';
        return;
    }

    const remainingLength = length - guaranteed.length;
    const array = new Uint32Array(remainingLength);
    window.crypto.getRandomValues(array);

    let password = guaranteed;

    for (let i = 0; i < remainingLength; i++) {
        password.push(charPool[array[i] % charPool.length]);
    }

    password = shuffleArray(password);

    const finalPassword = password.join('');
    document.getElementById('result').textContent = finalPassword;

    evaluateStrength(finalPassword);
}

function randomChar(str) {
    const randomIndex = Math.floor(Math.random() * str.length);
    return str[randomIndex];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function copyToClipboard() {
    const text = document.getElementById('result').textContent;
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
        alert("Password copied to clipboard!");
    }, () => {
        alert("Failed to copy.");
    });
}

function evaluateStrength(password) {
    let entropy = password.length * Math.log2(getCharsetSize(password));
    let strengthText;

    if (entropy < 40) {
        strengthText = 'Very Weak';
    } else if (entropy < 60) {
        strengthText = 'Weak';
    } else if (entropy < 80) {
        strengthText = 'Moderate';
    } else if (entropy < 100) {
        strengthText = 'Strong';
    } else {
        strengthText = 'Very Strong';
    }

    document.getElementById('strength').textContent = 'Strength: ' + strengthText;
}

function getCharsetSize(password) {
    let size = 0;
    if (/[A-Z]/.test(password)) size += 26;
    if (/[a-z]/.test(password)) size += 26;
    if (/[0-9]/.test(password)) size += 10;
    if (/[^A-Za-z0-9]/.test(password)) size += symbols.length;
    return size;
}
