const emailInput = document.querySelector('input');
const buttonEl = document.querySelector('button');
const errorMsg = document.querySelector('.error-message');
const container = document.querySelector('.container');
const thanksModal = document.querySelector('.thanks');
const dismissBtn = document.getElementById('dismiss-btn');
const confirmedEmailSpan = document.getElementById('confirmed-email');

// Validate input and handle subscribe
emailInput.addEventListener('input', function () {
    const emailValue = emailInput.value;

    if (emailValue.length > 0 && emailValue.includes('@')) {
        buttonEl.classList.add('active');
        errorMsg.style.display = 'none';
        emailInput.style.backgroundColor = 'white';
    } else {
        buttonEl.classList.remove('active');
        if (emailValue.length > 0) {
            errorMsg.style.display = 'inline';
            emailInput.style.backgroundColor = '#f8cbd5';
        } else {
            errorMsg.style.display = 'none';
            emailInput.style.backgroundColor = 'white';
        }
    }
});

// Show modal on button click
buttonEl.addEventListener('click', function () {
    const email = emailInput.value;

    if (email.includes('@')) {
        container.style.display = 'none'; // Hide main container
        confirmedEmailSpan.textContent = email; // Fill email into modal
        thanksModal.style.visibility = 'visible'; // Show modal
    }
});

// Dismiss modal and show container again
dismissBtn.addEventListener('click', function () {
    thanksModal.style.visibility = 'hidden'; // Hide modal
    container.style.display = 'block'; // Show container again
});
