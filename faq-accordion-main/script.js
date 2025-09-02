const faqItems = document.querySelectorAll("li");

// Open the first item by default
faqItems[0].classList.add("open");
faqItems[0].querySelector("p").style.display = "block";
faqItems[0].querySelector("img").src = "assets/images/icon-minus.svg";

// Add click listeners to all h4 elements
faqItems.forEach((item, index) => {
    const h4 = item.querySelector("h4");
    const icon = item.querySelector("img");
    const answer = item.querySelector("p");

    h4.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // Close all items
        faqItems.forEach((el) => {
            el.classList.remove("open");
            el.querySelector("p").style.display = "none";
            el.querySelector("img").src = "assets/images/icon-plus.svg";
        });

        // If this wasn't open before, open it
        if (!isOpen) {
            item.classList.add("open");
            answer.style.display = "block";
            icon.src = "assets/images/icon-minus.svg";
        }
    });
});
