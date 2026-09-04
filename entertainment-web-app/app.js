"use strict";

/* =========================================================
   GLOBAL STATE
   ========================================================= */

let movies = [];


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const trendingList =
  document.querySelector(".trending__list");

const recommendedList =
  document.querySelector(".recommended__list");

const trendingSection =
  document.querySelector("#trending");

const recommendedSection =
  document.querySelector("#recommended");

const searchInput =
  document.querySelector("#search-input");


/* =========================================================
   PAGE DETECTION
   ========================================================= */

const currentPage =
  window.location.pathname.split("/").pop() ||
  "index.html";


/* =========================================================
   LOAD MOVIE DATA
   ========================================================= */

async function loadMovies() {
  try {
    const response =
      await fetch("./data.json");

    if (!response.ok) {
      throw new Error(
        `Failed to load data.json: ${response.status}`
      );
    }

    movies =
      await response.json();

    initializePage();

  } catch (error) {
    console.error(
      "Unable to load movie data:",
      error
    );

    showDataError();
  }
}


/* =========================================================
   INITIALIZE PAGE
   ========================================================= */

function initializePage() {

  switch (currentPage) {

    case "index.html":
      initializeHomePage();
      break;

    case "movies.html":
      initializeMoviesPage();
      break;

    case "tv-series.html":
      initializeTvSeriesPage();
      break;

    case "bookmarked.html":
      initializeBookmarkedPage();
      break;

    default:
      initializeHomePage();
  }
}


/* =========================================================
   HOME PAGE
   ========================================================= */

function initializeHomePage() {

  if (!trendingList || !recommendedList) {
    return;
  }

  renderMovies(movies);

  initializeSearch();
}


/* =========================================================
   MOVIES PAGE
   ========================================================= */

function initializeMoviesPage() {

  const moviesPageList =
    document.querySelector(
      "#movies-list"
    );

  if (!moviesPageList) {
    return;
  }

  const movieItems =
    movies.filter(
      (movie) =>
        movie.category === "Movie"
    );

  renderPageCards(
    moviesPageList,
    movieItems
  );

  initializeSearch();
}


/* =========================================================
   TV SERIES PAGE
   ========================================================= */

function initializeTvSeriesPage() {

  const tvSeriesList =
    document.querySelector(
      "#tv-series-list"
    );

  if (!tvSeriesList) {
    return;
  }

  const tvSeries =
    movies.filter(
      (movie) =>
        movie.category === "TV Series"
    );

  renderPageCards(
    tvSeriesList,
    tvSeries
  );

  initializeSearch();
}


/* =========================================================
   BOOKMARKED PAGE
   ========================================================= */

function initializeBookmarkedPage() {

  const bookmarkedMoviesList =
    document.querySelector(
      "#bookmarked-movies"
    );

  const bookmarkedTvSeriesList =
    document.querySelector(
      "#bookmarked-tv-series"
    );


  const bookmarkedMovies =
    movies.filter(
      (movie) =>
        movie.isBookmarked &&
        movie.category === "Movie"
    );


  const bookmarkedTvSeries =
    movies.filter(
      (movie) =>
        movie.isBookmarked &&
        movie.category === "TV Series"
    );


  if (bookmarkedMoviesList) {
    renderPageCards(
      bookmarkedMoviesList,
      bookmarkedMovies
    );
  }


  if (bookmarkedTvSeriesList) {
    renderPageCards(
      bookmarkedTvSeriesList,
      bookmarkedTvSeries
    );
  }


  initializeSearch();
}


/* =========================================================
   CREATE MOVIE CARD
   ========================================================= */

function createMovieCard(
  movie,
  index,
  isTrending = false
) {

  const card =
    document.createElement("article");


  /* Card class */

  card.className =
    isTrending
      ? "movie-card movie-card--trending"
      : "movie-card";


  /* Animation delay */

  card.style.setProperty(
    "--card-delay",
    `${index * 80}ms`
  );


  /* Image */

  const image =
    isTrending
      ? movie.thumbnail.trending
      : movie.thumbnail.regular;


  /* Image markup */

  const imageMarkup =
    isTrending

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


  /* Card HTML */

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
    card.querySelector(
      ".movie-card__link"
    );


  cardLink.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      console.log(
        `Selected: ${movie.title}`
      );

    }
  );


  /* =======================================================
     BOOKMARK
     ======================================================= */

  const bookmarkButton =
    card.querySelector(
      ".movie-card__bookmark"
    );


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

function toggleBookmark(
  movie,
  button
) {

  movie.isBookmarked =
    !movie.isBookmarked;


  /* Update button */

  button.classList.toggle(
    "is-bookmarked",
    movie.isBookmarked
  );


  /* Accessibility */

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


  /*
   * If we're on the bookmarks page,
   * remove the card immediately when
   * the user unbookmarks it.
   */

  if (
    currentPage ===
    "bookmarked.html"
  ) {
    initializeBookmarkedPage();
  }
}


/* =========================================================
   RENDER TRENDING
   ========================================================= */

function renderTrending(
  trendingMovies
) {

  if (!trendingList) {
    return;
  }


  trendingList.innerHTML = "";


  trendingMovies.forEach(
    (movie, index) => {

      const card =
        createMovieCard(
          movie,
          index,
          true
        );


      trendingList.appendChild(
        card
      );

    }
  );
}


/* =========================================================
   RENDER RECOMMENDED
   ========================================================= */

function renderRecommended(
  recommendedMovies
) {

  if (!recommendedList) {
    return;
  }


  recommendedList.innerHTML = "";


  recommendedMovies.forEach(
    (movie, index) => {

      const card =
        createMovieCard(
          movie,
          index,
          false
        );


      recommendedList.appendChild(
        card
      );

    }
  );
}


/* =========================================================
   RENDER HOME PAGE
   ========================================================= */

function renderMovies(
  movieList
) {

  const trendingMovies =
    movieList.filter(
      (movie) =>
        movie.isTrending
    );


  const recommendedMovies =
    movieList.filter(
      (movie) =>
        !movie.isTrending
    );


  renderTrending(
    trendingMovies
  );


  renderRecommended(
    recommendedMovies
  );


  if (trendingSection) {

    trendingSection.hidden =
      trendingMovies.length === 0;

  }


  if (recommendedSection) {

    recommendedSection.hidden =
      recommendedMovies.length === 0;

  }
}


/* =========================================================
   RENDER GENERIC PAGE CARDS
   ========================================================= */

function renderPageCards(
  list,
  movieList
) {

  list.innerHTML = "";


  if (movieList.length === 0) {

    list.innerHTML = `
      <p class="data-message">
        No results found.
      </p>
    `;

    return;
  }


  movieList.forEach(
    (movie, index) => {

      const card =
        createMovieCard(
          movie,
          index,
          false
        );


      list.appendChild(card);

    }
  );
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchMovies(
  query
) {

  const searchTerm =
    query
      .trim()
      .toLowerCase();


  /*
   * HOME
   */

  if (
    currentPage ===
    "index.html"
  ) {

    if (!searchTerm) {

      renderMovies(movies);

      return;
    }


    const results =
      filterMovies(
        movies,
        searchTerm
      );


    renderMovies(results);

    return;
  }


  /*
   * MOVIES
   */

  if (
    currentPage ===
    "movies.html"
  ) {

    const list =
      document.querySelector(
        "#movies-list"
      );


    if (!list) {
      return;
    }


    const movieItems =
      movies.filter(
        (movie) =>
          movie.category === "Movie"
      );


    const results =
      searchTerm
        ? filterMovies(
            movieItems,
            searchTerm
          )
        : movieItems;


    renderPageCards(
      list,
      results
    );

    return;
  }


  /*
   * TV SERIES
   */

  if (
    currentPage ===
    "tv-series.html"
  ) {

    const list =
      document.querySelector(
        "#tv-series-list"
      );


    if (!list) {
      return;
    }


    const tvSeries =
      movies.filter(
        (movie) =>
          movie.category === "TV Series"
      );


    const results =
      searchTerm
        ? filterMovies(
            tvSeries,
            searchTerm
          )
        : tvSeries;


    renderPageCards(
      list,
      results
    );

    return;
  }


  /*
   * BOOKMARKS
   */

  if (
    currentPage ===
    "bookmarked.html"
  ) {

    searchBookmarked(
      searchTerm
    );

  }
}


/* =========================================================
   FILTER MOVIES
   ========================================================= */

function filterMovies(
  movieList,
  searchTerm
) {

  return movieList.filter(
    (movie) => {

      return (

        movie.title
          .toLowerCase()
          .includes(searchTerm)

        ||

        movie.category
          .toLowerCase()
          .includes(searchTerm)

        ||

        String(movie.year)
          .includes(searchTerm)

        ||

        movie.rating
          .toLowerCase()
          .includes(searchTerm)

      );

    }
  );
}


/* =========================================================
   SEARCH BOOKMARKS
   ========================================================= */

function searchBookmarked(
  searchTerm
) {

  const moviesList =
    document.querySelector(
      "#bookmarked-movies"
    );

  const tvSeriesList =
    document.querySelector(
      "#bookmarked-tv-series"
    );


  let bookmarkedMovies =
    movies.filter(
      (movie) =>
        movie.isBookmarked &&
        movie.category === "Movie"
    );


  let bookmarkedTvSeries =
    movies.filter(
      (movie) =>
        movie.isBookmarked &&
        movie.category === "TV Series"
    );


  if (searchTerm) {

    bookmarkedMovies =
      filterMovies(
        bookmarkedMovies,
        searchTerm
      );


    bookmarkedTvSeries =
      filterMovies(
        bookmarkedTvSeries,
        searchTerm
      );

  }


  if (moviesList) {

    renderPageCards(
      moviesList,
      bookmarkedMovies
    );

  }


  if (tvSeriesList) {

    renderPageCards(
      tvSeriesList,
      bookmarkedTvSeries
    );

  }
}


/* =========================================================
   SEARCH EVENT
   ========================================================= */

function initializeSearch() {

  if (!searchInput) {
    return;
  }


  searchInput.addEventListener(
    "input",
    (event) => {

      searchMovies(
        event.target.value
      );

    }
  );
}


/* =========================================================
   DATA ERROR
   ========================================================= */

function showDataError() {

  if (trendingList) {

    trendingList.innerHTML = `
      <p class="data-message">
        Unable to load movie data.
      </p>
    `;

  }


  if (recommendedList) {

    recommendedList.innerHTML = "";

  }


  if (trendingSection) {

    trendingSection.hidden = false;

  }


  if (recommendedSection) {

    recommendedSection.hidden = true;

  }


  const pageLists =
    document.querySelectorAll(
      ".recommended__list"
    );


  pageLists.forEach(
    (list) => {

      list.innerHTML = `
        <p class="data-message">
          Unable to load movie data.
        </p>
      `;

    }
  );
}


/* =========================================================
   START APPLICATION
   ========================================================= */

loadMovies();