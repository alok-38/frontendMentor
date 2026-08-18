const containerEl = document.getElementById("container");

fetch("/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("File not found");
    }

    return response.json();
  })
  .then((data) => {
    data.todos.forEach((item) => {
      const todo = document.createElement("li");
      todo.className = "todo";
      todo.textContent = item.title;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      todo.appendChild(checkbox);
      containerEl.appendChild(todo);
    });
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });
