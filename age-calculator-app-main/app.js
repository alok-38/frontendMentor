document.addEventListener("DOMContentLoaded", () => {
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const icon = document.querySelector(".icon");

    const yearOutput = document.querySelector(".year");
    const monthOutput = document.querySelector(".months");
    const dayOutput = document.querySelector(".days");

    function showError(input, message) {
        input.classList.add("error");
        input.nextElementSibling?.remove(); // Remove existing error if any

        const error = document.createElement("small");
        error.className = "error-message";
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(el => el.remove());
        document.querySelectorAll("input").forEach(input => input.classList.remove("error"));
    }

    function isValidDate(day, month, year) {
        const date = new Date(year, month - 1, day);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    }

    icon.addEventListener("click", () => {
        clearErrors(); // Remove previous errors

        const day = parseInt(dayInput.value, 10);
        const month = parseInt(monthInput.value, 10);
        const year = parseInt(yearInput.value, 10);
        const today = new Date();

        let isValid = true;

        // Check for empty fields
        if (!dayInput.value) {
            showError(dayInput, "This field is required");
            isValid = false;
        }

        if (!monthInput.value) {
            showError(monthInput, "This field is required");
            isValid = false;
        }

        if (!yearInput.value) {
            showError(yearInput, "This field is required");
            isValid = false;
        }

        // If any field is empty, skip further validation
        if (!isValid) return;

        // Validate day and month ranges
        if (day < 1 || day > 31) {
            showError(dayInput, "Must be a valid day (1–31)");
            isValid = false;
        }

        if (month < 1 || month > 12) {
            showError(monthInput, "Must be a valid month (1–12)");
            isValid = false;
        }

        if (year > today.getFullYear()) {
            showError(yearInput, "Year must be in the past");
            isValid = false;
        }

        // Validate full date (like 31 April)
        if (!isValidDate(day, month, year)) {
            showError(dayInput, "Must be a valid date");
            showError(monthInput, "");
            showError(yearInput, "");
            isValid = false;
        }

        // Validate future date
        const inputDate = new Date(year, month - 1, day);
        if (inputDate > today) {
            showError(dayInput, "Date cannot be in the future");
            showError(monthInput, "");
            showError(yearInput, "");
            isValid = false;
        }

        if (!isValid) return;

        // If all valid, calculate age
        const { years, months, days } = calculateAge(day, month, year);

        yearOutput.textContent = years;
        monthOutput.textContent = months;
        dayOutput.textContent = days;
    });

    function calculateAge(day, month, year) {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months -= 1;
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            months += 12;
            years -= 1;
        }

        return { years, months, days };
    }
});
