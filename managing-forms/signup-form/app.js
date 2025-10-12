const form = document.querySelector('form');
const emailError = document.getElementById('email-error');
const container = document.querySelector('.container');
const closeButton = document.getElementById('close-modal');
const confirmationModal = document.getElementById('confirmation-modal');

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function handleSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    if (isValidEmail(email)) {
        emailError.textContent = '';
        container.classList.add('hidden');
        confirmationModal.classList.remove('hidden');
        form.reset(); // Optional: clear form
    } else {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.value = '';
    }
}

form.addEventListener('submit', handleSubmit);

closeButton.addEventListener('click', () => {
    confirmationModal.classList.add('hidden');
    container.classList.remove('hidden');
});
