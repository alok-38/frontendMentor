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


