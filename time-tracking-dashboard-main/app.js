document.addEventListener("DOMContentLoaded", async function () {
  const currentHours = document.querySelectorAll(".card__current");
  const previousWeek = document.querySelectorAll(".card__previous");
  const filterButtons = document.querySelectorAll(
    'nav[aria-label="Timeframe"] button',
  );

  const getData = async () => {
    const response = await fetch("./public/data.json");
    return await response.json();
  };

  const dashBoardData = await getData();

  updateUI("weekly");

  function updateUI(timeframe) {
    dashBoardData.forEach((item, index) => {
      currentHours[index].innerHTML =
        item.timeframes[timeframe].current + "hrs";

      previousWeek[index].innerHTML =
        "Last Week - " + item.timeframes[timeframe].previous + "hrs";
    });
  }

  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const timeframe = filterButton.textContent.toLowerCase();
      updateUI(timeframe);
    });
  });
});
