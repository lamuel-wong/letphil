// Hardcoded data for testing
const defaultScheduleBlocks = [
  {
    id: 1,
    title: "Work",
    type: "work",
    date: "2026-10-06",
    startTime: "09:15",
    endTime: "20:30",
    completed: false,
  },
  {
    id: 2,
    title: "Mentorship Class",
    type: "study",
    date: "2026-10-05",
    startTime: "22:30",
    endTime: "23:30",
    completed: false,
  },
  {
    id: 3,
    title: "Upper Body",
    type: "gym",
    date: "2026-10-06",
    startTime: "22:00",
    endTime: "23:15",
    completed: false,
  },
];

const defaultGoals = [
  {
    id: 1,
    title: "Gym",
    target: 4,
    unit: "sessions",
    weekStartDate: "2026-10-05",
    linkedType: "gym",
  },
  {
    id: 2,
    title: "Study",
    target: 10,
    unit: "hours",
    weekStartDate: "2026-10-05",
    linkedType: "study",
  },
];

// Global variables

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const contactMessages = [];

const currentWeekStart = "2026-10-05"; // hardcoded start week for testing

const weeklyPlanner = document.getElementById("weekly-planner");
const weekRange = document.getElementById("week-range");
const scheduleForm = document.getElementById("schedule-form");
const scheduleSubmitBtn = document.getElementById("schedule-submit-btn");
const cancelScheduleEditBtn = document.getElementById("cancel-edit-btn");

const goalForm = document.getElementById("goal-form");
const goalSubmitBtn = document.getElementById("goal-submit-btn");
const cancelGoalEditBtn = document.getElementById("cancel-goal-edit-btn");
const goalList = document.getElementById("goal-list");

let scheduleBlocks =
  JSON.parse(localStorage.getItem("scheduleBlocks")) || defaultScheduleBlocks;

// state variable for handleScheduleSubmit function
let editingScheduleId = null;

let goals = JSON.parse(localStorage.getItem("goals")) || defaultGoals;

let editingGoalId = null;

// Date functions

// for splitting date string into year, month, and date
function createDateFromString(dateString) {
  const parts = dateString.split("-");

  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);

  return new Date(year, month, day);
}

function formatDateForData(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date) {
  return date.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
  });
}

function getWeekStart(dateString) {
  const date = createDateFromString(dateString);
  const dayOfWeek = date.getDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;

  date.setDate(date.getDate() - daysSinceMonday);

  return formatDateForData(date);
}

// Weekly Planner

function renderWeeklyPlanner() {
  weeklyPlanner.innerHTML = "";

  const weekStart = createDateFromString(currentWeekStart);

  days.forEach((day, index) => {
    const currentDate = new Date(weekStart);
    currentDate.setDate(weekStart.getDate() + index);

    const dateString = formatDateForData(currentDate);

    const dayColumn = document.createElement("div");
    dayColumn.classList.add("day-column");
    dayColumn.dataset.date = dateString;

    const dayTitle = document.createElement("h3");
    dayTitle.classList.add("day-name");
    dayTitle.textContent = day;

    const dayDate = document.createElement("p");
    dayDate.classList.add("day-date");
    dayDate.textContent = formatDisplayDate(currentDate);

    dayColumn.appendChild(dayTitle);
    dayColumn.appendChild(dayDate);

    weeklyPlanner.appendChild(dayColumn);
  });

  renderScheduleBlocks();
  renderWeekRange();
}

// Week range

function renderWeekRange() {
  const startDate = createDateFromString(currentWeekStart);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  weekRange.textContent = `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
}

// Schedule cards

function createScheduleCard(block) {
  const card = document.createElement("article");
  card.classList.add("schedule-card");

  const title = document.createElement("h4");
  title.classList.add("schedule-title");
  title.textContent = block.title;

  const type = document.createElement("p");
  type.classList.add("schedule-type");
  type.textContent = block.type;

  const time = document.createElement("p");
  time.classList.add("schedule-time");
  time.textContent = `${block.startTime} - ${block.endTime}`;

  const completionLabel = document.createElement("label");
  completionLabel.classList.add("schedule-completion");

  const completionCheckbox = document.createElement("input");
  completionCheckbox.type = "checkbox";
  completionCheckbox.checked = block.completed;

  completionCheckbox.addEventListener("change", () => {
    toggleScheduleCompletion(block.id);
  });

  completionLabel.appendChild(completionCheckbox);
  completionLabel.append(" Completed");

  const editButton = document.createElement("button");

  // Edit/Update
  editButton.type = "button";
  editButton.classList.add("edit-schedule-btn");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", function () {
    editScheduleBlock(block.id);
  });

  // Delete
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete-schedule-btn");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    deleteScheduleBlock(block.id);
  });

  card.appendChild(title);
  card.appendChild(type);
  card.appendChild(time);
  card.appendChild(completionLabel);
  card.appendChild(editButton);
  card.appendChild(deleteButton);

  return card;
}

// Schedule blocks

// find original schedule block and fill with existing values for editing
function editScheduleBlock(id) {
  const block = scheduleBlocks.find((block) => block.id === id);

  if (!block) {
    return;
  }

  document.getElementById("schedule-title").value = block.title;
  document.getElementById("schedule-type").value = block.type;
  document.getElementById("schedule-date").value = block.date;
  document.getElementById("schedule-start-time").value = block.startTime;
  document.getElementById("schedule-end-time").value = block.endTime;

  editingScheduleId = id;

  scheduleSubmitBtn.textContent = "Update Schedule";
  cancelScheduleEditBtn.hidden = false;
}

// helper to reset form back to add mode
function resetScheduleForm() {
  scheduleForm.reset();

  editingScheduleId = null;

  scheduleSubmitBtn.textContent = "Add Schedule";
  cancelScheduleEditBtn.hidden = true;
}

function renderScheduleBlocks() {
  scheduleBlocks.forEach(function (block) {
    const dayColumn = document.querySelector(
      `.day-column[data-date="${block.date}"]`,
    );

    if (dayColumn) {
      const scheduleCard = createScheduleCard(block);

      dayColumn.appendChild(scheduleCard);
    }
  });
}

function saveScheduleBlocks() {
  localStorage.setItem("scheduleBlocks", JSON.stringify(scheduleBlocks));
}

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function handleScheduleSubmit(event) {
  event.preventDefault();

  const title = document.getElementById("schedule-title").value.trim();
  const type = document.getElementById("schedule-type").value;
  const date = document.getElementById("schedule-date").value;
  const startTime = document.getElementById("schedule-start-time").value;
  const endTime = document.getElementById("schedule-end-time").value;

  // if null, adding mode, else editing mode
  if (editingScheduleId === null) {
    const newBlock = {
      id: Date.now(),
      title: title,
      type: type,
      date: date,
      startTime: startTime,
      endTime: endTime,
      completed: false,
    };

    scheduleBlocks.push(newBlock);
  } else {
    const block = scheduleBlocks.find(
      (block) => block.id === editingScheduleId,
    );

    if (block) {
      block.title = title;
      block.type = type;
      block.date = date;
      block.startTime = startTime;
      block.endTime = endTime;
    }
  }

  saveScheduleBlocks();
  renderWeeklyPlanner();
  renderGoals();
  resetScheduleForm();
}

function deleteScheduleBlock(id) {
  const index = scheduleBlocks.findIndex(function (block) {
    return block.id === id;
  });

  if (index !== -1) {
    scheduleBlocks.splice(index, 1);

    if (editingScheduleId === id) {
      resetScheduleForm();
    }

    saveScheduleBlocks();
    renderWeeklyPlanner();
    renderGoals();
  }
}

function toggleScheduleCompletion(id) {
  const block = scheduleBlocks.find((block) => block.id === id);

  if (!block) {
    return;
  }

  block.completed = !block.completed;

  saveScheduleBlocks();

  renderGoals();
}

// Goal Tracker

function createGoalCard(goal) {
  const card = document.createElement("article");
  card.classList.add("goal-card");

  const title = document.createElement("h3");
  title.classList.add("goal-title");
  title.textContent = goal.title;

  const progress = calculateGoalProgress(goal);

  const progressText = document.createElement("p");
  progressText.classList.add("goal-progress");
  progressText.textContent = `${progress} / ${goal.target} ${goal.unit}`;

  const progressBar = document.createElement("progress");
  progressBar.classList.add("goal-progress-bar");

  progressBar.max = goal.target;
  progressBar.value = Math.min(progress, goal.target);

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.classList.add("edit-goal-btn");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", () => editGoal(goal.id));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete-goal-btn");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => deleteGoal(goal.id));

  card.appendChild(title);
  card.appendChild(progressText);
  card.appendChild(progressBar);
  card.appendChild(editButton);
  card.appendChild(deleteButton);

  return card;
}

function renderGoals() {
  goalList.innerHTML = "";

  goals.forEach((goal) => {
    if (goal.weekStartDate === currentWeekStart) {
      const goalCard = createGoalCard(goal);

      goalList.appendChild(goalCard);
    }
  });
}

// find original goal and fill with existing values for editing
function editGoal(id) {
  const goal = goals.find((goal) => goal.id === id);

  if (!goal) {
    return;
  }

  document.getElementById("goal-title").value = goal.title;
  document.getElementById("goal-target").value = goal.target;
  document.getElementById("goal-unit").value = goal.unit;

  document.getElementById("goal-linked-type").value =
    goal.linkedType;

  editingGoalId = id;

  goalSubmitBtn.textContent = "Update Goal";
  cancelGoalEditBtn.hidden = false;
}

function resetGoalForm() {
  goalForm.reset();

  editingGoalId = null;

  goalSubmitBtn.textContent = "Add Goal";
  cancelGoalEditBtn.hidden = true;
}

function calculateGoalProgress(goal) {
  const matchingBlocks = scheduleBlocks.filter((block) => {
    return (
      block.type === goal.linkedType &&
      block.completed === true &&
      getWeekStart(block.date) === goal.weekStartDate
    );
  });

  if (goal.unit === "sessions") {
    return matchingBlocks.length;
  }

  if (goal.unit === "hours") {
    const totalMinutes = matchingBlocks.reduce((total, block) => {
      const startParts = block.startTime.split(":");
      const endParts = block.endTime.split(":");

      const startMinutes = Number(startParts[0]) * 60 + Number(startParts[1]);

      const endMinutes = Number(endParts[0]) * 60 + Number(endParts[1]);

      // const duration = endMinutes - startMinutes;
      let duration = endMinutes - startMinutes;

      // for if the end time is after midnight
      if (duration < 0) {
        duration += 24 * 60;
      }

      return total + duration;
    }, 0);

    return Math.round((totalMinutes / 60) * 100) / 100;
  }

  return 0;
}

function handleGoalSubmit(event) {
  event.preventDefault();

  const title = document.getElementById("goal-title").value.trim();

  const target = Number(document.getElementById("goal-target").value);

  const unit = document.getElementById("goal-unit").value;

  const linkedType = document.getElementById("goal-linked-type").value;

  if (!title || !Number.isFinite(target) || target <= 0) {
    alert("Please enter a valid goal title and target.");
    return;
  }

  if (editingGoalId === null) {
    const newGoal = {
      id: Date.now(),
      title: title,
      target: target,
      unit: unit,
      weekStartDate: currentWeekStart,
      linkedType: linkedType,
    };

    goals.push(newGoal);
  } else {
    const goal = goals.find(
      (goal) => goal.id === editingGoalId
    );

    if (!goal) {
      resetGoalForm();
      return;
    }

    goal.title = title;
    goal.target = target;
    goal.unit = unit;
    goal.linkedType = linkedType;
  }

  saveGoals();
  renderGoals();
  resetGoalForm();
}

function deleteGoal(id) {
  const index = goals.findIndex((goal) => goal.id === id);

  if (index === -1) {
    return;
  }

  goals.splice(index, 1);

  if (editingGoalId === id) {
    resetGoalForm();
  }

  saveGoals();
  renderGoals();
}

// Event listeners

scheduleForm.addEventListener("submit", handleScheduleSubmit);
cancelScheduleEditBtn.addEventListener("click", resetScheduleForm);

goalForm.addEventListener("submit", handleGoalSubmit);
cancelGoalEditBtn.addEventListener("click", resetGoalForm);

// Main
renderWeeklyPlanner();
renderGoals();
