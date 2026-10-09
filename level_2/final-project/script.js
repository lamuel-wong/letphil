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
    date: "2026-09-28",
    startTime: "22:00",
    endTime: "23:15",
    completed: false,
  },
  {
    id: 4,
    title: "Work",
    type: "work",
    date: "2026-09-29",
    startTime: "09:15",
    endTime: "20:30",
    completed: false,
  },
  {
    id: 5,
    title: "Mentorship Class",
    type: "study",
    date: "2026-09-30",
    startTime: "22:30",
    endTime: "23:30",
    completed: false,
  },
  {
    id: 6,
    title: "Upper Body",
    type: "gym",
    date: "2026-09-28",
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
    weekStartDate: "2026-10-04",
    linkedType: "gym",
  },
  {
    id: 2,
    title: "Study",
    target: 10,
    unit: "hours",
    weekStartDate: "2026-10-04",
    linkedType: "study",
  },
  {
    id: 3,
    title: "Gym",
    target: 4,
    unit: "sessions",
    weekStartDate: "2026-09-27",
    linkedType: "gym",
  },
  {
    id: 4,
    title: "Study",
    target: 10,
    unit: "hours",
    weekStartDate: "2026-09-27",
    linkedType: "study",
  },
];

//
// GLOBAL VARIABLES
//

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let contactMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];

// grab current week
const todayWeekStart = getWeekStart(formatDateForData(new Date()));

let currentWeekStart = todayWeekStart;

// dashboard variables
const goalsCompletedValue = document.getElementById("goals-completed-value");
const studyHoursValue = document.getElementById("study-hours-value");
const nextShiftValue = document.getElementById("next-shift-value");

// weekly planner variables
const weeklyPlanner = document.getElementById("weekly-planner");
const weekRange = document.getElementById("week-range");

const previousWeekBtn = document.getElementById("previous-week-btn");
const nextWeekBtn = document.getElementById("next-week-btn");
const currentWeekBtn = document.getElementById("current-week-btn");
const previousWeeksList = document.getElementById("previous-weeks-list");

const scheduleForm = document.getElementById("schedule-form");
const scheduleSubmitBtn = document.getElementById("schedule-submit-btn");
const cancelScheduleEditBtn = document.getElementById("cancel-edit-btn");

// goal tracker variables
const goalForm = document.getElementById("goal-form");
const goalSubmitBtn = document.getElementById("goal-submit-btn");
const cancelGoalEditBtn = document.getElementById("cancel-goal-edit-btn");
const goalList = document.getElementById("goal-list");

// contact form variables
const contactForm = document.getElementById("contact-form");

const contactStatus = document.getElementById("contact-status");

// grab saved or default scheduleBlock objects
let scheduleBlocks =
  JSON.parse(localStorage.getItem("scheduleBlocks")) || defaultScheduleBlocks;

// state variable for handleScheduleSubmit function
let editingScheduleId = null;

// grab saved or default goals objects
let goals = JSON.parse(localStorage.getItem("goals")) || defaultGoals;

let editingGoalId = null;

//
// DATE FUNCTIONS
//

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

function createDateTime(dateString, timeString) {
  const date = createDateFromString(dateString);

  const timeParts = timeString.split(":");

  const hours = Number(timeParts[0]);
  const minutes = Number(timeParts[1]);

  date.setHours(hours, minutes, 0, 0);

  return date;
}

function getWeekStart(dateString) {
  const date = createDateFromString(dateString);
  const dayOfWeek = date.getDay();
  date.setDate(date.getDate() - dayOfWeek);

  return formatDateForData(date);
}

// helper for switching weeks
function changeWeek(numberOfWeeks) {
  const weekStart = createDateFromString(currentWeekStart);
  weekStart.setDate(weekStart.getDate() + numberOfWeeks * 7);
  currentWeekStart = formatDateForData(weekStart);

  renderSelectedWeek();
}

function goToCurrentWeek() {
  currentWeekStart = todayWeekStart;
  renderSelectedWeek();
}

function renderSelectedWeek() {
  renderApp();
  loadWeather();
  resetScheduleForm();
  resetGoalForm();
}

//
// DASHBOARD
//

function calculateGoalsCompleted(weekStartDate = currentWeekStart) {
  const currentWeekGoals = goals.filter(
    (goal) => goal.weekStartDate === weekStartDate,
  );
  const completedGoals = currentWeekGoals.filter(
    (goal) => calculateGoalProgress(goal) >= goal.target,
  );

  return {
    completed: completedGoals.length,
    total: currentWeekGoals.length,
  };
}

function renderGoalsCompleted() {
  const result = calculateGoalsCompleted();

  goalsCompletedValue.textContent = `${result.completed} / ${result.total}`;
}

function calculateStudyHours(weekStartDate = currentWeekStart) {
  const studyBlocks = scheduleBlocks.filter((block) => {
    return (
      block.type === "study" &&
      block.completed === true &&
      getWeekStart(block.date) === weekStartDate
    );
  });

  const totalMinutes = studyBlocks.reduce((total, block) => {
    return total + calculateBlockDuration(block);
  }, 0);

  return Math.round((totalMinutes / 60) * 100) / 100;
}

function renderStudyHours() {
  const hours = calculateStudyHours();

  studyHoursValue.textContent = hours + " h";
}

function findUpcomingShift() {
  const now = new Date();

  const upcomingShifts = scheduleBlocks
    .filter((block) => {
      if (block.type !== "work") {
        return false;
      }

      if (block.completed === true) {
        return false;
      }

      const shiftDateTime = createDateTime(block.date, block.startTime);

      return shiftDateTime >= now;
    })
    .sort((a, b) => {
      const dateA = createDateTime(a.date, a.startTime);
      const dateB = createDateTime(b.date, b.startTime);

      return dateA - dateB;
    });

  return upcomingShifts[0] || null;
}

function renderUpcomingShift() {
  const shift = findUpcomingShift();

  if (!shift) {
    nextShiftValue.textContent = "None";
    return;
  }

  const shiftDate = createDateFromString(shift.date);

  nextShiftValue.textContent = `${formatDisplayDate(shiftDate)} at ${shift.startTime}`;
}

function renderDashboard() {
  renderGoalsCompleted();
  renderStudyHours();
  renderUpcomingShift();
}

// WEEKLY PLANNER

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

    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("day-weather");
    weatherContainer.dataset.date = dateString;

    dayColumn.appendChild(dayTitle);
    dayColumn.appendChild(dayDate);
    dayColumn.appendChild(weatherContainer);

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

// weather helper
function describeWeather(weatherCode) {
  let weatherDesc;

  if (weatherCode === 0) {
    weatherDesc = "☀️ Clear sky";
  } else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
    weatherDesc = "⛅ Partly cloudy";
  } else if (weatherCode === 45 || weatherCode === 48) {
    weatherDesc = "🌫️ Foggy";
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    weatherDesc = "🌧️ Rain or drizzle";
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    weatherDesc = "🌨️ Snow";
  } else if (weatherCode >= 80 && weatherCode <= 82) {
    weatherDesc = "🌦️ Rain showers";
  } else if (weatherCode >= 85 && weatherCode <= 86) {
    weatherDesc = "🌨️ Snow showers";
  } else if (weatherCode >= 95) {
    weatherDesc = "⛈️ Thunderstorm";
  } else {
    weatherDesc = "🌡️ Unknown weather";
  }

  return weatherDesc;
}

// WEATHER API

async function fetchWeather() {
  // Toronto coordinates
  const latitude = 43.65;
  const longitude = -79.38;

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&past_days=6` +
    `&timezone=America%2FToronto`;

  console.log(url);

  try {
    showWeatherLoading();
    const response = await axios.get(url);

    return response.data.daily;
  } catch (error) {
    console.error("Weather error:", error);

    showWeatherError();

    return null;
  }
}

function showWeatherLoading() {
  const weatherContainers = document.querySelectorAll(".day-weather");
  weatherContainers.forEach(
    (container) => (container.textContent = "Loading..."),
  );
}

function showWeatherError() {
  const weatherContainers = document.querySelectorAll(".day-weather");
  weatherContainers.forEach(
    (container) => (container.textContent = "Weather unavailable"),
  );
}

function renderWeather(weatherData) {
  const weatherContainers = document.querySelectorAll(".day-weather");
  weatherContainers.forEach((container) => (container.textContent = ""));

  if (!weatherData) {
    return;
  }

  // match api forecast date to corresponding day in planner
  // only render forecast for dates in current planner week
  weatherData.time.forEach((date, index) => {
    const weatherContainer = document.querySelector(
      `.day-weather[data-date="${date}"]`,
    );

    if (!weatherContainer) {
      return;
    }

    const weatherDesc = describeWeather(weatherData.weather_code[index]);
    const maxTemp = Math.round(weatherData.temperature_2m_max[index]);
    const minTemp = Math.round(weatherData.temperature_2m_min[index]);

    weatherContainer.innerHTML = `
      <span class="weather-desc">${weatherDesc}</span>
      <span class="weather-temp">
        ${maxTemp}° / ${minTemp}°
      </span>
    `;
  });
}

// helper for loadWeather so i dont call the api for previous weeks
function isPastWeek() {
  const weekStart = createDateFromString(currentWeekStart);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  console.log(today);
  
  return weekEnd < today;
}

async function loadWeather() {
  if (isPastWeek()) {
    return;
  }

  const weatherData = await fetchWeather();
  if (!weatherData) {
    return;
  }

  renderWeather(weatherData);
}

// SCHEDULE CARDS

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

//
// SCHEDULE BLOCKS
//

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
  renderApp();
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
    renderApp();
  }
}

function toggleScheduleCompletion(id) {
  const block = scheduleBlocks.find((block) => block.id === id);

  if (!block) {
    return;
  }

  block.completed = !block.completed;

  saveScheduleBlocks();

  renderApp();
}

//
// GOAL TRACKER
//

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

  document.getElementById("goal-linked-type").value = goal.linkedType;

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
      return total + calculateBlockDuration(block);
    }, 0);

    return Math.round((totalMinutes / 60) * 100) / 100;
  }

  return 0;
}

// helper to calculate duration
function calculateBlockDuration(block) {
  const startParts = block.startTime.split(":");
  const endParts = block.endTime.split(":");

  const startMinutes = Number(startParts[0]) * 60 + Number(startParts[1]);
  const endMinutes = Number(endParts[0]) * 60 + Number(endParts[1]);

  let duration = endMinutes - startMinutes;

  if (duration < 0) {
    duration += 24 * 60;
  }

  return duration;
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
    const goal = goals.find((goal) => goal.id === editingGoalId);

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
  renderApp();
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
  renderApp();
}

//
// PREVIOUS WEEK FUNCTIONS
//

function getPreviousWeekStarts() {
  const scheduleWeeks = scheduleBlocks.map((block) => getWeekStart(block.date));
  const goalWeeks = goals.map((goal) => goal.weekStartDate);

  const allWeeks = [...scheduleWeeks, ...goalWeeks];

  // console.log("allweeks: " + allWeeks);
  // console.log("scheduleWeeks: " + scheduleWeeks);
  // console.log("goalWeeks: " + goalWeeks);

  const uniqueWeeks = [...new Set(allWeeks)];

  // console.log("uniqueWeeks: " + uniqueWeeks);

  return uniqueWeeks
    .filter(
      (weekStart) =>
        createDateFromString(weekStart) < createDateFromString(todayWeekStart),
    )
    .sort((a, b) => createDateFromString(b) - createDateFromString(a));

  // console.log("fixed uniqueWeeks: " + uniqueWeeks);
}

function createPreviousWeekCard(weekStartDate) {
  const card = document.createElement("article");
  card.classList.add("previous-week-card");

  const startDate = createDateFromString(weekStartDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const title = document.createElement("h3");
  title.textContent = `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;

  const goalResult = calculateGoalsCompleted(weekStartDate);
  const goalsSummary = document.createElement("p");
  goalsSummary.textContent = `Goals completed: ${goalResult.completed} / ${goalResult.total}`;

  const studyHours = calculateStudyHours(weekStartDate);

  const viewButton = document.createElement("button");
  viewButton.type = "button";
  viewButton.textContent = "View Week";

  viewButton.addEventListener("click", () => {
    currentWeekStart = weekStartDate;
    renderSelectedWeek();

    document.getElementById("planner").scrollIntoView({
      behavior: "smooth",
    });
  });

  card.appendChild(title);
  card.appendChild(goalsSummary);

  if (studyHours > 0) {
    const studySummary = document.createElement("p");
    studySummary.textContent = `Study hours: ${studyHours} h`;

    card.appendChild(studySummary);
  }

  card.appendChild(viewButton);

  return card;
}

function renderPreviousWeeks() {
  previousWeeksList.innerHTML = "";
  const previousWeeks = getPreviousWeekStarts();

  if (previousWeeks.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No previous weeks saved yet.";

    previousWeeksList.appendChild(message);

    return;
  }

  previousWeeks.forEach((weekStartDate) => {
    const card = createPreviousWeekCard(weekStartDate);
    previousWeeksList.appendChild(card);
  });
}

// CONTACT FORM

function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if (name.length < 2 || !email.includes("@") || message.length < 10) {
    contactStatus.textContent = "Please enter valid contact information.";
    return;
  }

  const newMessage = {
    id: Date.now(),
    name: name,
    email: email,
    message: message,
    submittedAt: new Date().toISOString(),
  };

  contactMessages.push(newMessage);

  localStorage.setItem("contactMessages", JSON.stringify(contactMessages));

  contactStatus.textContent = "Feedback sent successfully.";
  contactForm.reset();
}

// EVENT LISTENERS

scheduleForm.addEventListener("submit", handleScheduleSubmit);
cancelScheduleEditBtn.addEventListener("click", resetScheduleForm);

goalForm.addEventListener("submit", handleGoalSubmit);
cancelGoalEditBtn.addEventListener("click", resetGoalForm);

previousWeekBtn.addEventListener("click", () => {
  changeWeek(-1);
});
nextWeekBtn.addEventListener("click", () => {
  changeWeek(1);
});
currentWeekBtn.addEventListener("click", goToCurrentWeek);

contactForm.addEventListener("submit", handleContactSubmit);

// MAIN

function renderApp() {
  renderWeeklyPlanner();
  renderGoals();
  renderDashboard();
  renderPreviousWeeks();
}

renderApp();
loadWeather();
