document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const errorEl = document.getElementById('error');
    const emailValue = emailInput.value.trim();

    // Simple email validation (can be improved)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!isValidEmail) {
        errorEl.innerText = "Please enter a valid email address";
        errorEl.style.color = 'orangered';
        emailInput.classList.add('error'); // Optional: add class to style input
    } else {
        errorEl.textContent = ""; // Clear error
        emailInput.classList.remove('error');
        console.log("Email submitted:", emailValue);
        // You can now send the email to a server or show success message
    }
});