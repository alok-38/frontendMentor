// Helper: calculate strength based on length and types of chars included
function calculateStrength(length, typesCount) {
    if (length >= 12 && typesCount >= 3) return 4; // Very Strong
    if (length >= 10 && typesCount >= 2) return 3; // Strong
    if (length >= 8 && typesCount >= 1) return 2;  // Medium
    if (length > 0) return 1;                      // Weak
    return 0;                                      // None
}

// Helper: map score to descriptive text
function strengthText(score) {
    switch (score) {
        case 4: return 'Very Strong';
        case 3: return 'Strong';
        case 2: return 'Medium';
        case 1: return 'Weak';
        default: return 'Strength';
    }
}

const generateButton = document.querySelector('button');
const range = document.querySelector('input[type="range"]');
const passwordOutput = document.getElementById('passwordOutput');
const strengthTextInput = document.getElementById('passwordStrength');
const strengthBars = document.querySelectorAll('.password-strength > div');

generateButton.addEventListener('click', () => {
    const length = parseInt(range.value, 10);
    const checkboxes = document.querySelectorAll('.parameters div input[type="checkbox"]');
    const includeUppercase = checkboxes[0]?.checked;
    const includeLowercase = checkboxes[1]?.checked;
    const includeNumbers = checkboxes[2]?.checked;
    const includeSymbols = checkboxes[3]?.checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}:"<>?|[];\',./`~';

    let charset = '';
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (!charset) {
        alert('Please select at least one character type!');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    passwordOutput.value = password;

    // Calculate strength score
    const typesCount = [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length;
    const score = calculateStrength(length, typesCount);

    // Update text
    strengthTextInput.value = strengthText(score);

    // Update bars with class toggling for smooth CSS transitions
    strengthBars.forEach((bar, idx) => {
        if (idx < score) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
});
