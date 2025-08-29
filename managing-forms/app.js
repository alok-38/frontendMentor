document.addEventListener("DOMContentLoaded", () => {
    const formEl = document.querySelector("form");

    formEl.addEventListener("submit", function (e) {
        e.preventDefault();

        clearErrors();

        const nameEl = form.name.value.trim();
        const emailEl = form.email.value.trim();
        const passwordEl = form.password.value;
        const confirmPasswordEl = form['confirm-password'].value;

        let valid = true;

        if (!name) {
            showError('name', 'Name is required');
            valid = false;
        }

        if (!email || !validateEmail(email)) {
            showError('email', 'Valid email is required');
            valid = false;
        }

        if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            valid = false;
        }

        if (confirmPassword !== password) {
            showError('confirm-password', 'Passwords do not match');
            valid = false;
        }

        if (valid) {
            // Submit form data here or do further processing
            console.log('Form submitted');
        }
    });

    function showError(field, message) {
        const errorSpan = document.getElementById(`${field}-error`);
        errorSpan.textContent = message;
    }

    function clearErrors() {
        ['name', 'email', 'password', 'confirm-password'].forEach(field => {
            document.getElementById(`${field}-error`).textContent = '';
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});