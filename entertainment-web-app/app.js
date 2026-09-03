const trendingList = document.querySelector(".trending__list");

fetch("/data.json").then((response) => {
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
});
