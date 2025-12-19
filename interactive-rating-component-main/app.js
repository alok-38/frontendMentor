const ratingSection = document.querySelector('.rating');
const thankYouSection = document.querySelector('.thank-you');
const radios = document.querySelectorAll('input[name="rating"]');
const submitBtn = document.querySelector('.submit');
const selectedRatingEl = document.getElementById('selected-rating');

// Create star container once
const starsContainer = document.createElement('div');
starsContainer.classList.add('icon-circle');
ratingSection.prepend(starsContainer);

const createStar = (count) => {
    starsContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const circle = document.createElement('div');
        circle.classList.add('icon-circle__item');

        const img = document.createElement('img');
        img.src = 'images/icon-star.svg';
        img.alt = 'star rating icon';

        circle.appendChild(img);
        starsContainer.appendChild(circle);
    }
};

// Handle rating change
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        createStar(Number(radio.value));
        selectedRatingEl.textContent = radio.value;
    });
});

// Handle submit
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Require a rating before submit
    const selected = document.querySelector('input[name="rating"]:checked');
    if (!selected) return;

    ratingSection.hidden = true;
    thankYouSection.hidden = false;
});
