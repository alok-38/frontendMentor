// Theme toggle
const body = document.body;
const toggle = document.getElementById('theme-toggle');
const header = document.querySelector('header');

// Set initial state (optional but recommended)
toggle.checked = body.dataset.theme === 'dark';

toggle.addEventListener('change', () => {
    body.dataset.theme = toggle.checked ? 'dark' : 'light';
});

