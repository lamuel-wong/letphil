// ============================================================
// 🐛  EVENT LISTENERS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// To test: swap <script src="app.js"> for <script src="debug.js">
// in index.html.
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// Clicking "Add Task" should log the title.
// Instead it logs the title immediately when the page loads,
// then does nothing when you click. What's wrong?

function logTitle() {
  const title = document.getElementById("task-title-input").value;
  console.log("Title: " + title);
}

// document.getElementById("add-task-btn")
//   .addEventListener("click", logTitle());

// What's wrong ↓
// On line 22, the function logTitle is being called instead of passing it
// Your fix ↓
document.getElementById("add-task-btn")
  .addEventListener("click", logTitle);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This should hide/show task cards based on priority filter.
// Clicking "High" hides all tasks instead of showing only high ones.
// What's wrong with the condition?

// function handleFilter(event) {
//   const filter  = event.target.dataset.filter;
//   const allCards = document.querySelectorAll(".task-card");

//   allCards.forEach(function(card) {
//     if (card.dataset.priority !== filter) {
//       card.classList.remove("hidden");
//     } else {
//       card.classList.add("hidden");
//     }
//   });
// }

// document.querySelector(".header-right")
//   .addEventListener("click", handleFilter);

// What's wrong ↓
// The condition in line 42 is reversed, it only shows cards that don't match the filter and hides cards that do match.
// Your fix ↓
function handleFilter(event) {
  const filter  = event.target.dataset.filter;
  const allCards = document.querySelectorAll(".task-card");

  allCards.forEach(function(card) {
    if (card.dataset.priority !== filter) {
      card.classList.add("hidden");
    } else {
      card.classList.remove("hidden");
    }
  });
}

document.querySelector(".header-right")
  .addEventListener("click", handleFilter);

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This delegation handler should remove a task card when
// its Remove button is clicked. Nothing happens when clicked.
// There are TWO bugs.

// function handleBoardClick(event) {
//   const card   = event.target.closest(".task-card");
//   const taskId = card.dataset.id;

//   if (event.target.classList.contains("remove-btn")) {
//     card.remove();
//   }
// }

// document.querySelector(".board")
//   .addEventListener("click", handleBoardClick);

// Bug 1 ↓
// null is not guarded against from using .closest() as clicking empty space can return null and result in an error
// Bug 2 ↓
// On line 84, the task card is removed visually from the DOM but the data or task still exists in the tasks array
// Your fix ↓
function handleBoardClick(event) {
  const card   = event.target.closest(".task-card");
  const taskId = card.dataset.id;

  if (!card) {
    return;
  }

  if (event.target.classList.contains("remove-btn")) {
    const index = tasks.findIndex((task) => task.id === taskId);
    tasks.splice(index, 1);
    card.remove();
  }
}

document.querySelector(".board")
  .addEventListener("click", handleBoardClick);
