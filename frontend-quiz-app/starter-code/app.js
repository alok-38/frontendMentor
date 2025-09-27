const toggleButton = document.getElementById('theme-toggle');
const bodyEl = document.body;
const navImage = document.querySelector('nav img');
const headerPEl = document.querySelector('header p');
const ulLiEls = document.querySelectorAll('ul > li');

toggleButton.addEventListener('click', () => {
    // Toggle dark theme class on body
    bodyEl.classList.toggle('dark-theme');

    if (bodyEl.classList.contains('dark-theme')) {
        // Nav icon
        navImage.style.filter = "brightness(0) saturate(100%) invert(100%)";

        // Header text
        headerPEl.style.color = "#ABC1E1";

        // List item background
        ulLiEls.forEach(li => {
            li.style.backgroundColor = "#3B4D66";
        });

    } else {
        // Reset nav icon
        navImage.style.filter = "";

        // Reset header color
        headerPEl.style.color = "";

        // Reset list item backgrounds
        ulLiEls.forEach(li => {
            li.style.backgroundColor = "";
        });
    }
});
