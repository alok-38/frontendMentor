const toggleBtn = document.getElementById('toggleBtn');
const box = document.getElementById('box');

toggleBtn.addEventListener('click', () => {
    // Check current display state and toggle
    if (box.style.display === 'none') {
        box.style.display = 'block';
    } else {
        box.style.display = 'none';
    }
    p.textContent = 'A new day is dawning';
})

const p = document.querySelector('.myParagraph');