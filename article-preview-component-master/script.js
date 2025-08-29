const buttonEl = document.querySelector('button');
const popupEl = document.querySelector('.pop-up');

buttonEl.addEventListener('click', () => {
    // Toggle the popup's visibility
    if (popupEl.style.visibility === 'visible') {
        popupEl.style.visibility = 'hidden';
    } else {
        popupEl.style.visibility = 'visible';
    }
});
