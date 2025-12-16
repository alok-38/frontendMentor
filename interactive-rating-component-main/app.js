const sectionEl = document.querySelector('.rating');
const radios = document.querySelectorAll('input[name="rating"]');
const submitBtn = document.querySelector('.submit');

// Create container ONCE
const starsContainer = document.createElement("div");
starsContainer.classList.add('icon-circle');
sectionEl.prepend(starsContainer);

const createStar = (count) => {
    // Clear previous stars
    starsContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const circle = document.createElement("div");
        circle.classList.add('icon-circle__item');

        const img = document.createElement("img");
        img.src = "images/icon-star.svg";
        img.alt = "star rating icon";

        circle.appendChild(img);
        starsContainer.appendChild(circle);
    }
};

// Attach listeners
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        createStar(Number(radio.value));
    });
});

const thankTheCustomer = () => {
    console.log("Thank You!");
}

submitBtn.addEventListener('click', thankTheCustomer);