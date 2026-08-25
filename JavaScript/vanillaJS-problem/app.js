const containerEl = document.getElementById("container");

const response = await fetch("/todo.json");

const data = await response.json();

data.tasks.forEach((element) => {
  const todo = document.createElement("li");
  todo.className = "todo";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = element.completed;
  todo.textContent = element.title;
  const label = document.createElement("label");
  label.textContent = element.task;

  label.append(checkbox);
  todo.append(label);
  containerEl.appendChild(todo);
});
