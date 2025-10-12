const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop the page from reloading

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    console.log('Name:', name);
    console.log('Email:', email);
});
    