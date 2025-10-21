// Fetch user data from an online API
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(function (response) {
        // Convert response to usable data
        return response.json();
    })
    .then(function (data) {
        // Show the name in the HTML
        document.getElementById('username').textContent = `Name: ${data.name}`;
        document.getElementById('user-age').textContent = `Age: ${data.age || 'Not available'}`;
    });