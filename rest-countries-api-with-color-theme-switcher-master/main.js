window.addEventListener("DOMContentLoaded", async () => {
  // Toggle dark mode
  const toggleButton = document.getElementById("toggle");
  const html = document.documentElement;

  toggleButton.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");

    html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
  });

  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    // Pick a random item
    const randomCountry = data[Math.floor(Math.random() * data.length)];

    // Render it
    document.querySelector(".countries").innerHTML = `
       <img
        src="${randomCountry.flags.svg}"
        alt="${randomCountry.name} flag"
        width="200"
      >
    `;
  } catch (error) {
    console.error("Could not load JSON:", error);
  }
});
