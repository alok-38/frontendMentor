const button = document.querySelector('button');


const getUserData = () => {
    // Fetch user data from an online API
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(function (response) {
            return response.json(); // Convert response to usable data
        })
        .then(function (data) {
            document.getElementById('username').textContent = data.name;
            document.getElementById('email').textContent = data.email;
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
}

button.addEventListener('click', getUserData);