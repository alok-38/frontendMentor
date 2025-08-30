const emailInput = document.querySelector('input');
const buttonEl = document.querySelector('button');

emailInput.addEventListener('input', function () {
    if (emailInput.value.length > 0) {
        buttonEl.classList.add('active');
    } else {
        buttonEl.classList.remove('active');
    }
});