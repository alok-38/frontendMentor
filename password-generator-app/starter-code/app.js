const range = document.getElementById('rangeSlider');

function updateTrack() {
    const value = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const percent = ((value - min) / (max - min)) * 100;

    // Set linear gradient background on input element
    range.style.background = `linear-gradient(to right, var(--green-200) 0%, var(--green-200) ${percent}%, var(--grey-850) ${percent}%, var(--grey-850) 100%)`;
}

range.addEventListener('input', updateTrack);

// Initialize on page load
updateTrack();
