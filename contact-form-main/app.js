const firstNameEl = document.getElementById('first-name');
const lastNameEl = document.getElementById('last-name');
const emailEl = document.getElementById('email-address');
const generalEnqueryEl = document.getElementById('general-enquiry');
const supportRequestEl = document.getElementById('support-request');
const messageEl = document.querySelector('textarea');
const consentEl = document.getElementById('consent');
const buttonEl = document.querySelector('button');

const errorEl = document.querySelectorAll('#error');

const validateForm = (event) => {
    event.preventDefault();
    errorEl.forEach(error => {
        error.textContent = 'error';
        error.style.color = 'red';
    })
}

buttonEl.addEventListener('click', validateForm);