const toggleButton = document.getElementById("toggle");
const html = document.documentElement;

toggleButton.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");

  html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
});
