const cartButton = document.querySelector('button');
const sectionEl = document.querySelector('section');

cartButton.addEventListener('click', () => {
    sectionEl.style.display = 'none';
})