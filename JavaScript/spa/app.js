// Select DOM Elements
const taskInputEl = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addButton = document.getElementById("add-btn");
const appContainer = document.querySelector(".app-container");

// Initialize application state from local storage or empty array
let tasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

function addTask() {
  const taskInput = taskInputEl.value.trim();

  if (taskInput === "") {
    const alertEl = document.createElement("p");

    alertEl.textContent = "Please enter a valid task";
    alertEl.style.color = "red";

    appContainer.appendChild(alertEl);

    setTimeout(() => {
      alertEl.remove();
    }, 3000);

    taskInputEl.addEventListener(
      "input",
      () => {
        alertEl.remove();
      },
      { once: true },
    );

    return;
  }

  tasks.push(taskInput);

  // Save tasks
  localStorage.setItem("savedTasks", JSON.stringify(tasks));

  // Reset input
  taskInputEl.value = "";

  // Render updated tasks
  renderTasks();
}

function renderTasks() {
  // Clear existing list
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;

    taskList.appendChild(li);
  });
}

addButton.addEventListener("click", addTask);

// Render saved tasks when page loads
renderTasks();

