const nav = document.querySelector(".nav");
const openButton = document.querySelector("#menu-toggle");
const closeButton = document.querySelector("#menu-close");
const menu = document.querySelector("#menu");
const menuLinks = document.querySelectorAll(".nav__link");

function setMenuState(isOpen) {
  nav.classList.toggle("is-open", isOpen);

  openButton.setAttribute("aria-expanded", String(isOpen));
  menu.setAttribute("aria-hidden", String(!isOpen));

  closeButton.hidden = !isOpen;
}

function openMenu() {
  setMenuState(true);
}

function closeMenu() {
  setMenuState(false);
}

openButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

setMenuState(false);
