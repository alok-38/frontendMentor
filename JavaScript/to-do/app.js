const container = document.getElementById('todos-container');
const toggleBtn = document.getElementById('toggle');
let showCompleted = true; // default state
let allTodos = [];

// Append a single item to the DOM
const appendItem = (item) => {
    const li = document.createElement('li');
    li.textContent = item.text;
    li.dataset.completed = item.completed;

    if (item.completed) {
        li.style.textDecoration = 'line-through';
        li.style.color = 'gray';
    }

    container.appendChild(li);
};

