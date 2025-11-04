const buttons = document.querySelectorAll('button');
const currentTime = document.querySelectorAll('.current');
const previousTime = document.querySelectorAll('.previous');

fetch('../data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));