const emailInput = document.getElementById('email');
const subscribeButton = document.querySelector('button');
const emailError = document.querySelector('.error-message');
const thankyouMessage = document.querySelector('.thanks--container');
const dismissButton = document.getElementById('dismiss-btn');
const containerEL = document.querySelector('.container');
const confirmedEmail = document.getElementById('confirmed-email');
const form = document.querySelector('form');

// Store computed background to revert later
const originalButtonBackground = getComputedStyle(subscribeButton).backgroundImage;

// Regex for basic email format
const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|org|net|edu|gov|co)$/i;

// Handle input: show gradient and clear errors
emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() !== "") {
        subscribeButton.style.backgroundImage = "linear-gradient(to right, #FF6A3A 0%, #FF527B 100%)";
    } else {
        subscribeButton.style.backgroundImage = originalButtonBackground;
    }

    emailError.style.display = 'none';
    emailInput.classList.remove('invalid');
});

// Handle submit: validate email and show thank-you
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailValue = emailInput.value.trim();

    if (!emailRegex.test(emailValue)) {
        emailError.style.display = 'block';
        emailInput.classList.add('invalid');
    } else {
        emailError.style.display = 'none';
        emailInput.classList.remove('invalid');

        containerEL.style.display = "none";
        thankyouMessage.style.display = 'block';
        confirmedEmail.textContent = emailValue;
    }
});

// Handle dismiss button
dismissButton.addEventListener('click', () => {
    thankyouMessage.style.display = 'none';
    containerEL.style.display = "block";
    emailInput.value = "";
    subscribeButton.style.backgroundImage = originalButtonBackground;
});
