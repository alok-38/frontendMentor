const articles = document.querySelectorAll('article');

articles.forEach(article => {
    const heading = article.querySelector('h2');
    const content = article.querySelector('p');
    const icon = heading.querySelector('img'); // <-- scope to this h2 only

    heading.addEventListener('click', () => {
        const isOpen = content.classList.toggle('is-open');
        heading.classList.toggle('is-open');

        // Change icon based on open/close state
        if (isOpen) {
            icon.src = "assets/images/icon-minus.svg"; // open state
        } else {
            icon.src = "assets/images/icon-plus.svg"; // closed state
        }
    });
});
