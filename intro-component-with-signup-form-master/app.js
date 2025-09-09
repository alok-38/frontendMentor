const claimButton = document.querySelector('button:not(form button)');

document.addEventListener("DOMContentLoaded", function () {
    const formEl = document.querySelector('form');

    formEl.addEventListener('submit', function (e) {
        e.preventDefault();
    })
})