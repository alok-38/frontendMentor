fetch("/data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong.");

    return response.json();
  })
  .then((data) => {
    document.querySelector(".container").textContent = JSON.stringify(
      data,
      null,
      2,
    );
  });
