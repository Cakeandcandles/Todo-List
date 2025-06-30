const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.priority.toLowerCase();
    li.innerHTML = `
  <div class="task-content">
    <span class="task-text">${task.text}</span>
    <small>[${task.priority}]</small>
  </div>
  <button class="delete" onclick="deleteTask(${index})">✖</button>
`;

    taskList.appendChild(li);
  });
}

function addTask(text, priority) {
  tasks.push({ text, priority });
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const priority = priorityInput.value;
  if (text) {
    addTask(text, priority);
    taskInput.value = "";
  }
});

renderTasks();
