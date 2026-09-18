// ============================================================
// 🐛  localStorage — HOMEWORK  |  DEBUG TASKS
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This saves a task array to localStorage and reads it back.
// But tasks.length logs 1 instead of 3, and tasks[0] is a string.
// What's wrong?

// const tasksToSave = [
//   { id: 1, title: "Task A" },
//   { id: 2, title: "Task B" },
//   { id: 3, title: "Task C" }
// ];

// localStorage.setItem("tasks", JSON.stringify(tasksToSave));

// const tasks = localStorage.getItem("tasks");
// console.log(tasks.length);   // logs a large number — wrong
// console.log(tasks[0]);       // logs "{" — wrong, expected an object

// What's wrong ↓
// The tasks array was not parsed before using getItem
// Your fix ↓
const tasksToSave = [
  { id: 1, title: "Task A" },
  { id: 2, title: "Task B" },
  { id: 3, title: "Task C" }
];

localStorage.setItem("tasks", JSON.stringify(tasksToSave));

const raw = localStorage.getItem("tasks");
if (!raw) {
  console.error("Error loading tasks");  
}
const tasks = JSON.parse(raw);
console.log(tasks.length);   
console.log(tasks[0]);       

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This function should save the task board state and show
// a save indicator. The save works but the indicator never appears.
// What's wrong?

function saveBoardState(taskList) {
  localStorage.setItem("board", JSON.stringify(taskList));

  const indicator = document.getElementById("save-indicator");
  indicator.classList.add("visible");

  setTimeout(function() {
    indicator.classList.remove("visible");
  }, 1500);
}

// The indicator element has this CSS:
// .save-indicator { opacity: 0; transition: opacity 0.3s; }
// .save-indicator.visible { opacity: 1; }
//
// saveBoardState() is being called from inside another function
// that also does heavy DOM work immediately after.
// Think about what could prevent the class from taking visual effect.

// What's wrong ↓
// The heavy DOM work immediately after probably blocked the class from taking visual effect, as heavy synchronous operations can block or delay DOM painting
// Your fix — conceptual explanation is enough here ↓
// Allow the browser to render the save indicator first by either breaking down the heavy DOM work into smaller asynchronous tasks or use setTimeout to defer the heavy work to after rendering the save indicator.

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This loads tasks and renders them.
// It crashes on first load AND has a second bug that causes
// duplicate tasks on every subsequent load.
// Find both bugs.

// let taskList = [];

// function loadAndRender() {
//   const raw = localStorage.getItem("boardTasks");
//   taskList  = JSON.parse(raw);

//   taskList.forEach(function(task) {
//     const li = document.createElement("li");
//     li.textContent = task.title;
//     document.getElementById("list-todo").appendChild(li);
//   });
// }

// // Saving some tasks so the second bug can be demonstrated:
// localStorage.setItem("boardTasks", JSON.stringify([
//   { id: 1, title: "Task A", status: "todo" },
//   { id: 2, title: "Task B", status: "todo" }
// ]));

// loadAndRender();
// loadAndRender(); // called again — what happens?

// Bug 1 (crash on first load) ↓
// No null check before parsing raw data
// Bug 2 (duplicates) ↓
// Not clearing the DOM before re-rendering the todo list
// Your fix ↓
let taskList = [];

function loadAndRender() {
  const raw = localStorage.getItem("boardTasks");
  if (!raw) {
  console.error("Error loading tasks");  
  return;
}
  taskList  = JSON.parse(raw);

  const todoList = document.getElementById("list-todo");
  todoList.innerHTML = "";

  taskList.forEach(function(task) {
    const li = document.createElement("li");
    li.textContent = task.title;
    todoList.appendChild(li);
  });
}

// Saving some tasks so the second bug can be demonstrated:
localStorage.setItem("boardTasks", JSON.stringify([
  { id: 1, title: "Task A", status: "todo" },
  { id: 2, title: "Task B", status: "todo" }
]));

loadAndRender();
loadAndRender(); // called again — what happens?