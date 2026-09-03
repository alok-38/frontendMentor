"use strict";

const trendingList = document.querySelector(".trending__list");
const recommendedList = document.querySelector(".recommended__list");
const trendingSection = document.querySelector("#trending");
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
   DATA ERROR
   ========================================================= */

function showDataError() {
  trendingList.innerHTML = `
    <p class="data-message">
      Unable to load movie data.
    </p>
  `;

  recommendedList.innerHTML = "";

  trendingSection.hidden = false;
  recommendedSection.hidden = true;
}


/* =========================================================
   CREATE MOVIE CARD
   ========================================================= */

function createMovieCard(movie, index, isTrending = false) {
  const card = document.createElement("article");

  /*
   * Add the appropriate card class.
   */

  card.className = isTrending
    ? "movie-card movie-card--trending"
    : "movie-card";


  /*
   * Stagger the entrance animation.
   *
   * 0    → 0ms
   * 1    → 80ms
   * 2    → 160ms
   * 3    → 240ms
   * etc.
   */

  card.style.setProperty(
    "--card-delay",
    `${index * 80}ms`
  );


  /*
   * Choose the correct image set.
   *
   * Trending:
   * thumbnail.trending
   *
   * Regular:
   * thumbnail.regular
   */

  const image = isTrending
    ? movie.thumbnail.trending
    : movie.thumbnail.regular;


  /*
   * Trending has small + large.
   *
   * Regular has small + medium + large.
   *
   * The <picture> element lets the browser
   * select the appropriate image.
   */

  const imageMarkup = isTrending
    ? `
      <picture>
        <source
          media="(min-width: 1024px)"
          srcset="${image.large}"
        />

        <img
          class="movie-card__image"
          src="${image.small}"
          alt="${movie.title}"
          width="470"
          height="230"
          loading="${index < 2 ? "eager" : "lazy"}"
          decoding="async"
        />
      </picture>
    `
    : `
      <picture>
        <source
          media="(min-width: 1024px)"
          srcset="${image.large}"
        />

        <source
          media="(min-width: 768px)"
          srcset="${image.medium}"
        />

        <img
          class="movie-card__image"
          src="${image.small}"
          alt="${movie.title}"
          width="280"
          height="174"
          loading="lazy"
          decoding="async"
        />
      </picture>
    `;


  /*
   * Create the card.
   */

  card.innerHTML = `
    <a
      class="movie-card__link"
      href="#"
      aria-label="View ${movie.title} details"
    >

      ${imageMarkup}

      <div class="movie-card__info">

        <div class="movie-card__metadata">

          <time
            class="movie-card__date"
            datetime="${movie.year}"
          >
            ${movie.year}
          </time>

          <span class="movie-card__type">
            ${movie.category}
          </span>

          <span class="movie-card__rating">
            ${movie.rating}
          </span>

        </div>

        <h3 class="movie-card__title">
          ${movie.title}
        </h3>

      </div>

    </a>

    <button
      class="movie-card__bookmark ${
        movie.isBookmarked
          ? "is-bookmarked"
          : ""
      }"
      type="button"
      aria-label="${
        movie.isBookmarked
          ? `Remove ${movie.title} from bookmarks`
          : `Add ${movie.title} to bookmarks`
      }"
      aria-pressed="${movie.isBookmarked}"
    >
      <img
        src="assets/icon-nav-bookmark.svg"
        alt=""
        width="16"
        height="16"
      />
    </button>
  `;


  /* =======================================================
     CARD LINK
     ======================================================= */

  const cardLink =
    card.querySelector(".movie-card__link");

  cardLink.addEventListener("click", (event) => {
    event.preventDefault();

    console.log(
      `Selected: ${movie.title}`
    );
  });


  /* =======================================================
     BOOKMARK
     ======================================================= */

  const bookmarkButton =
    card.querySelector(".movie-card__bookmark");

  bookmarkButton.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      toggleBookmark(
        movie,
        bookmarkButton
      );
    }
  );


  return card;
}


/* =========================================================
   TOGGLE BOOKMARK
   ========================================================= */

function toggleBookmark(movie, button) {
  /*
   * Update the actual data object.
   *
   * This means the bookmark state survives
   * a re-render caused by searching.
   */

  movie.isBookmarked =
    !movie.isBookmarked;


  /*
   * Update button appearance.
   */

  button.classList.toggle(
    "is-bookmarked",
    movie.isBookmarked
  );


  /*
   * Update accessibility state.
   */

  button.setAttribute(
    "aria-pressed",
    String(movie.isBookmarked)
  );


  button.setAttribute(
    "aria-label",
    movie.isBookmarked
      ? `Remove ${movie.title} from bookmarks`
      : `Add ${movie.title} to bookmarks`
  );
}


/* =========================================================
   RENDER TRENDING
   ========================================================= */

function renderTrending(trendingMovies) {
  trendingList.innerHTML = "";

  trendingMovies.forEach(
    (movie, index) => {
      const card = createMovieCard(
        movie,
        index,
        true
      );

      trendingList.appendChild(card);
    }
  );
}


/* =========================================================
   RENDER RECOMMENDED
   ========================================================= */

function renderRecommended(recommendedMovies) {
  recommendedList.innerHTML = "";

  recommendedMovies.forEach(
    (movie, index) => {
      const card = createMovieCard(
        movie,
        index,
        false
      );

      recommendedList.appendChild(card);
    }
  );
}


/* =========================================================
   RENDER MOVIES
   ========================================================= */

function renderMovies(movieList) {
  /*
   * Separate the data according to
   * isTrending from your JSON.
   */

  const trendingMovies =
    movieList.filter(
      (movie) => movie.isTrending
    );

  const recommendedMovies =
    movieList.filter(
      (movie) => !movie.isTrending
    );


  /*
   * Render both sections.
   */

  renderTrending(trendingMovies);

  renderRecommended(recommendedMovies);


  /*
   * Hide sections when they have
   * no matching results.
   */

  trendingSection.hidden =
    trendingMovies.length === 0;

  recommendedSection.hidden =
    recommendedMovies.length === 0;
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchMovies(query) {
  const searchTerm =
    query.trim().toLowerCase();


  /*
   * Empty search:
   * restore the complete dataset.
   */

  if (!searchTerm) {
    renderMovies(movies);
    return;
  }


  /*
   * Search across:
   *
   * - title
   * - category
   * - year
   * - rating
   */

  const results = movies.filter(
    (movie) => {
      return (
        movie.title
          .toLowerCase()
          .includes(searchTerm) ||

        movie.category
          .toLowerCase()
          .includes(searchTerm) ||

        String(movie.year)
          .includes(searchTerm) ||

        movie.rating
          .toLowerCase()
          .includes(searchTerm)
      );
    }
  );


  renderMovies(results);
}


/* =========================================================
   SEARCH EVENT
   ========================================================= */

searchInput.addEventListener(
  "input",
  (event) => {
    searchMovies(
      event.target.value
    );
  }
);


/* =========================================================
   START APPLICATION
   ========================================================= */

loadMovies();