fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.error("Oops! Something went wrong.");
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
