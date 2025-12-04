const buttonEl = document.querySelector('button');
const rangeEl = document.querySelector('input[type="range"]');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');

const generatePasswod = () => {
    const userUpper = upperEl.checked;
    const userLower = lowerEl.checked;
    const userNumber = numberEl.checked;
    const userSymbol = symbolEl.checked;
    const length = characterLength();

    const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerSet = "abcdefghijklmnopqrstuvwxyz";
    const numberSet = "0123456789";
    const symbolSet = "!@#$%^&*()_+{}[]<>?";
}

const characterLength = () => {
    console.log(rangeEl.value);
}

rangeEl.addEventListener('input', characterLength);
buttonEl.addEventListener('click', generatePasswod);