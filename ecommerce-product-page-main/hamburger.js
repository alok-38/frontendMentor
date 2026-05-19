const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-list");
const overlay = document.getElementById("nav-overlay");

let startX = 0;

/* =========================
   OPEN / CLOSE
========================= */
function openMenu() {
  nav.classList.add("active");
  overlay.classList.add("active");
  toggle.classList.add("active");
  toggle.setAttribute("aria-expanded", "true");

  // focus first link
  nav.querySelector("a").focus();
}

function closeMenu() {
  nav.classList.remove("active");
  overlay.classList.remove("active");
  toggle.classList.remove("active");
  toggle.setAttribute("aria-expanded", "false");

  toggle.focus();
}

/* =========================
   TOGGLE CLICK
========================= */
toggle.addEventListener("click", () => {
  nav.classList.contains("active") ? closeMenu() : openMenu();
});

overlay.addEventListener("click", closeMenu);

/* =========================
   ESC KEY
========================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

/* =========================
   FOCUS TRAP
========================= */
nav.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;

  const focusable = nav.querySelectorAll("a");
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

/* =========================
   SWIPE TO CLOSE
========================= */
nav.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

nav.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    closeMenu(); // swipe left closes
  }
});