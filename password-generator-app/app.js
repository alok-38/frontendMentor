const copyPassword = () => {
    // Create message
    const msg = document.createElement("span");
    msg.classList.add("copied-message");
    msg.textContent = "COPIED";
    // Insert it BEFORE the icon
    copiedMessage.prepend(msg);
    // Remove after 2 seconds 
    setTimeout(() => {
        msg.remove();
    }, 2000);
}

const copyEl = document.querySelector('header img');
const copiedMessage = document.querySelector('header div');

copyEl.addEventListener('click', copyPassword);

const inputRangeEl = document.querySelector('input[type="range"]');

const slider = document.querySelector('input[type="range"]');

function updateFill() {
    const min = slider.min || 0;
    const max = slider.max || 16;
    const val = slider.value;

    const percent = ((val - min) * 100) / (max - min);

    slider.style.background = `linear-gradient(
    to right,
    var(--green-200) 0%,
    var(--green-200) ${percent}%,
    var(--grey-850) ${percent}%,
    var(--grey-850) 100%
  )`;
}

const count = document.getElementById("count");

function updateCharLength() {
    count.textContent = slider.value;
    count.style.color = "#a4ffaf";
}

slider.addEventListener("input", updateCharLength);
updateCharLength(); // show initial value



