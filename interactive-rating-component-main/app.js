const ratingGroup = document.querySelector(".rating-group");
const iconContainer = document.querySelector(".icon__container");

ratingGroup.addEventListener("click", (event) => {
  const rating = Number(event.target.id.split("-")[1]);
  if (!rating) return;

  // clear container first
  iconContainer.innerHTML = "";

  // create wrapper div
  for (let count = 0; count < rating; count++) {
    const div = document.createElement("div");
    div.classList.add("card__icon");

    // create image
    const img = document.createElement("img");
    img.src = "./images/icon-star.svg";
    img.alt = "star";

    div.appendChild(img);
    iconContainer.appendChild(div);
  }
});
