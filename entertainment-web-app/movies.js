"use strict";

const recommendedList = document.querySelector(".recommended__list");
const recommendedSection = document.querySelector("#recommended");
const searchInput = document.querySelector("#search-input");

let movies = [];

/* =========================================================
   LOAD MOVIE DATA
   ========================================================= */

async function loadMovies() {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error(
        `Failed to load data.json: ${response.status}`
      );
    }

    movies = await response.json();

    renderMovies(movies);
  } catch (error) {
    console.error("Unable to load movie data:", error);

    showDataError();
  }
}

/* =========================================================
   RENDER MOVIES
   ========================================================= */

function renderMovies(movieList) {
  if (!recommendedList || !recommendedSection) {
    return;
  }

  recommendedList.innerHTML = "";

  movieList.forEach((movie, index) => {
    const card = createMovieCard(movie, index);

    recommendedList.appendChild(card);
  });

  recommendedSection.hidden = movieList.length === 0;
}

/* =========================================================
   CREATE MOVIE CARD
   ========================================================= */

function createMovieCard(movie, index) {
  const article = document.createElement("article");

  article.className = "movie-card";

  article.style.setProperty(
    "--card-delay",
    `${index * 50}ms`
  );

  article.innerHTML = `
    <a
      class="movie-card__link"
      href="#"
      aria-label="View ${movie.title} details"
    >
      <img
        class="movie-card__image"
        src="${movie.thumbnail?.regular?.large ?? ""}"
        alt=""
        width="280"
        height="174"
        loading="lazy"
        decoding="async"
      />

      <div class="movie-card__info">
        <div class="movie-card__metadata">
          <time
            class="movie-card__date"
            datetime="${movie.year ?? ""}"
          >
            ${movie.year ?? ""}
          </time>

          <span class="movie-card__type">
            ${movie.category ?? ""}
          </span>

          <span class="movie-card__rating">
            ${movie.rating ?? ""}
          </span>
        </div>

        <h3 class="movie-card__title">
          ${movie.title ?? ""}
        </h3>
      </div>
    </a>

    <button
      class="movie-card__bookmark"
      type="button"
      aria-label="Add ${movie.title} to bookmarks"
    >
      <img
        src="assets/icon-nav-bookmark.svg"
        alt=""
        width="16"
        height="16"
      />
    </button>
  `;

  return article;
}

/* =========================================================
   SEARCH
   ========================================================= */

searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query)
  );

  renderMovies(filteredMovies);
});

/* =========================================================
   ERROR STATE
   ========================================================= */

function showDataError() {
  if (!recommendedList) {
    return;
  }

  recommendedList.innerHTML = `
    <p class="data-error">
      Unable to load movies. Please try again later.
    </p>
  `;
}

/* =========================================================
   INITIALIZE
   ========================================================= */

loadMovies();