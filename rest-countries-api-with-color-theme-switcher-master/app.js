import countries from "./data.json" with { type: "json" };

countries.slice(0, 6).forEach((country) => {
    const mainEl = document.querySelector('main');
    mainEl.textContent += country.name;
})