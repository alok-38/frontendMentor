const html = document.documentElement;
const toggleButton = document.getElementById("toggle");
const countriesContainer = document.querySelector(".countries");

const countryCard = document.querySelector(".country-card");

async function fetchCountries() {
  const response = await fetch("./data.json");

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

function getRandomCountries(countries, count) {
  return [...countries].sort(() => Math.random() - 0.5).slice(0, count);
}

function renderCountries(countries) {
  countriesContainer.innerHTML = countries
    .map(
      (country) => `
        <article class="country-card">
          <div class="country-card__image">
            <img
              class="country-card__flag"
              src="${country.flags.svg}"
              alt="${country.name} flag"
            >
          </div>

          <div class="country-card__content">
            <h2 class="country-card__name">
              ${country.name}
            </h2>

            <div class="country-card__facts">
              <p>
                <strong>Population:</strong>
                ${country.population.toLocaleString()}
              </p>

              <p>
                <strong>Region:</strong>
                ${country.region}
              </p>

              <p>
                <strong>Capital:</strong>
                ${country.capital}
              </p>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function toggleTheme() {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
}

async function init() {
  toggleButton.addEventListener("click", toggleTheme);

  try {
    const countries = await fetchCountries();
    const randomCountries = getRandomCountries(countries, 8);

    renderCountries(randomCountries);
  } catch (error) {
    console.error("Could not load countries:", error);
  }
}

window.addEventListener("DOMContentLoaded", init);

