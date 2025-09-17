const button = document.querySelector('button');
const modal = document.getElementById('modal');

function toggleModal() {
    modal.classList.toggle('active');
}

button.addEventListener('click', toggleModal);
