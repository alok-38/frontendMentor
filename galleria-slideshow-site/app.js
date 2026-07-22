const cardEl = document.querySelectorAll(".card");

async function loadData() {
  try {
    const response = await fetch("/data.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    cardEl.forEach((card, index) => {
      const item = data[index];

      if (!item) return;

      card.innerHTML = `
  <img src="${item.images.thumbnail}" alt="${item.name}" />

  <div class="overlay">
    <h3>${item.name}</h3>
    <p>${item.artist.name}</p>
  </div>
`;
    });
  } catch (error) {
    console.error("Oops! Something went wrong:", error);
  }
}

loadData();
