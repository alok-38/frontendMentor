const ratingButtons = document.querySelectorAll('.rating-btn');
const submitButton = document.getElementById('submit-btn');
const ratingCard = document.getElementById('rating-card');
const thankYouCard = document.getElementById('thank-you-card');
const selectedRatingSpan = document.getElementById('selected-rating');
const backButton = document.getElementById('back-btn');

const selectedText = document.querySelector('.selected-rating');
const thankYouTitle = thankYouCard.querySelector('h2');
const thankYouMessage = thankYouCard.querySelectorAll('p')[1]; // second <p> in thank-you card

let selectedRating = null;

// Handle rating selection
ratingButtons.forEach(button => {
    button.addEventListener('click', () => {
        ratingButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedRating = button.textContent;
    });
});

// Handle submit
submitButton.addEventListener('click', () => {
    ratingCard.classList.add('hidden');
    thankYouCard.classList.remove('hidden');

    if (selectedRating) {
        selectedRatingSpan.textContent = selectedRating;
        selectedText.style.display = '';
        thankYouTitle.style.display = '';
        thankYouMessage.style.display = '';
    } else {
        selectedRatingSpan.textContent = "Please select a rating before submitting.";
        selectedText.style.display = ''; // still show, but with custom message
        thankYouTitle.style.display = 'none';
        thankYouMessage.style.display = 'none';
    }
});

// Handle back button
backButton.addEventListener('click', () => {
    thankYouCard.classList.add('hidden');
    ratingCard.classList.remove('hidden');

    // Reset rating selection
    ratingButtons.forEach(btn => btn.classList.remove('selected'));
    selectedRating = null;

    // Reset thank-you card display
    selectedRatingSpan.textContent = "3"; // or any default
    thankYouTitle.style.display = '';
    thankYouMessage.style.display = '';
});
