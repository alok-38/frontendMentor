document.addEventListener("DOMContentLoaded", function () {
    const formEl = document.querySelector("form");
    const claimButton = formEl.querySelector("button");

    claimButton.addEventListener("click", function () {
        // Optional: formEl.reportValidity(); // shows native validation errors
        formEl.requestSubmit(); // triggers 'submit' if valid
    });

    formEl.addEventListener("submit", function (e) {
        e.preventDefault();

        // Your form handling logic here
        console.log("Form submitted!");
    });
});
