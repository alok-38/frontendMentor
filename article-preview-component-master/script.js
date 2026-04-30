const shareButton = document.getElementById("shareButton");
const modal = document.getElementById("modal");

shareButton.addEventListener("click", () => {
  modal.classList.toggle("open");
});
