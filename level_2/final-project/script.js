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

const goals = [
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
const scheduleForm = document.getElementById("schedule-form");
const weekRange = document.getElementById("week-range");

const scheduleSubmitBtn = document.getElementById("schedule-submit-btn");

const cancelEditBtn = document.getElementById("cancel-edit-btn");

let scheduleBlocks =
  JSON.parse(localStorage.getItem("scheduleBlocks")) || defaultScheduleBlocks;

// state variable for handleScheduleSubmit function
let editingScheduleId = null;

// Date functions

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
  card.appendChild(editButton);
  card.appendChild(deleteButton);

  return card;
}

// Schedule blocks

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
  cancelEditBtn.hidden = false;
}

// helper to reset form back to add mode
function resetScheduleForm() {
  scheduleForm.reset();

  editingScheduleId = null;

  scheduleSubmitBtn.textContent = "Add Schedule";
  cancelEditBtn.hidden = true;
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
  }
}

// Event listeners

scheduleForm.addEventListener("submit", handleScheduleSubmit);
cancelEditBtn.addEventListener("click", resetScheduleForm);

// Main
renderWeeklyPlanner();
