fetch("/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // 1. Render Trending Section
    const trendingList = document.querySelector(".trending__list");
    if (trendingList) {
      trendingList.innerHTML = "";

      data
        .filter((movie) => movie.isTrending)
        .forEach((movie) => {
          const imageUrl = movie.thumbnail?.trending?.small;
          if (!imageUrl) return;

          const article = document.createElement("article");
          article.className = "movie-card movie-card--trending";
          article.setAttribute("role", "listitem");

          article.innerHTML = `
          <a class="movie-card__link" href="#" aria-label="View ${movie.title} details">
            <img
              class="movie-card__image"
              src="${imageUrl}"
              alt="${movie.title}"
              width="470"
              height="230"
              loading="eager"
              fetchpriority="high"
            />
            <div class="movie-card__overlay">
              <div class="movie-card__info">
                <div class="movie-card__metadata">
                  <time class="movie-card__date" datetime="${movie.year}">${movie.year}</time>
                  <span class="movie-card__type" aria-label="${movie.category}">${movie.category}</span>
                  <span class="movie-card__rating">${movie.rating}</span>
                </div>
                <h2 class="movie-card__title">${movie.title}</h2>
              </div>
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
          trendingList.appendChild(article);
        });
    }

    // 2. Render Recommended Section
    const recommendedList = document.querySelector(".recommended__list");
    if (recommendedList) {
      recommendedList.innerHTML = "";

      // Recommended items typically use regular thumbnails
      data.forEach((movie) => {
        const imageUrl = movie.thumbnail?.regular?.small;
        if (!imageUrl) return;

        const article = document.createElement("article");
        article.className = "movie-card";
        article.setAttribute("role", "listitem");

        article.innerHTML = `
          <a class="movie-card__link" href="#" aria-label="View ${movie.title} details">
            <img
              class="movie-card__image"
              src="${imageUrl}"
              alt="${movie.title}"
              width="280"
              height="174"
              loading="lazy"
              decoding="async"
            />
            <div class="movie-card__info">
              <div class="movie-card__metadata">
                <time class="movie-card__date" datetime="${movie.year}">${movie.year}</time>
                <span class="movie-card__type" aria-label="${movie.category}">${movie.category}</span>
                <span class="movie-card__rating">${movie.rating}</span>
              </div>
              <h3 class="movie-card__title">${movie.title}</h3>
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
        recommendedList.appendChild(article);
      });
    }
  })
  .catch((error) => {
    console.error("Error loading movies:", error);
  });
