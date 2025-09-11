document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent default submission

        // Get all field values
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message-box').value.trim();
        const consentChecked = document.getElementById('consent-box').checked;
        const queryTypeSelected = document.querySelector('input[name="query-type"]:checked');

        // Clear previous errors (optional enhancement)
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(el => el.remove());

        let hasError = false;

        // Helper to show error
        const showError = (element, message) => {
            const error = document.createElement('p');
            error.classList.add('error');
            error.style.color = 'red';
            error.style.fontSize = '0.9rem';
            error.innerText = message;
            element.parentNode.appendChild(error);
        };

        // Validate fields
        if (!firstName) {
            showError(document.getElementById('first-name'), 'First name is required');
            hasError = true;
        }

        if (!lastName) {
            showError(document.getElementById('last-name'), 'Last name is required');
            hasError = true;
        }

        if (!email) {
            showError(document.getElementById('email'), 'Email is required');
            hasError = true;
        } else if (!validateEmail(email)) {
            showError(document.getElementById('email'), 'Enter a valid email');
            hasError = true;
        }

        if (!queryTypeSelected) {
            const querySection = document.querySelector('.query-type');
            showError(querySection, 'Please select a query type');
            hasError = true;
        }

        if (!message) {
            showError(document.getElementById('message-box'), 'Message cannot be empty');
            hasError = true;
        }

        if (!consentChecked) {
            const consentBox = document.querySelector('.consent-box');
            showError(consentBox, 'You must consent before submitting');
            hasError = true;
        }

        if (!hasError) {
            alert('Form submitted successfully!');
            form.submit(); // actually submit the form if no errors
        }
    });

    // Email validation helper
    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
});
