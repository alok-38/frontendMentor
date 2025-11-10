const buttons = document.querySelectorAll('button');
const currentTime = document.querySelectorAll('.current');
const previousTime = document.querySelectorAll('.previous');

const data = fetch('../data.json')
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.error("Error:", error);
    });

buttons.forEach(button => {
    button.addEventListener('click', () => {
        currentTime.textContent = ``
    })
})
