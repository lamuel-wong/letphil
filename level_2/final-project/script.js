const scheduleBlocks = [
  {
    id: 1,
    title: "Work",
    type: "work",
    date: "2026-09-01",
    startTime: "09:15",
    endTime: "20:30",
    completed: false,
  },

  {
    id: 2,
    title: "Mentorship Class",
    type: "study",
    date: "2026-09-01",
    startTime: "22:00",
    endTime: "23:00",
    completed: false,
  },

  {
    id: 3,
    title: "Upper Body",
    type: "gym",
    date: "2026-09-02",
    startTime: "11:00",
    endTime: "12:15",
    completed: false,
  },
];

const goals = [
  {
    id: 1,
    title: "Gym",
    target: 4,
    unit: "sessions",
    weekStartDate: "2026-08-31",
    linkedType: "gym",
    completed: false,
  },
  {
    id: 2,
    title: "Study",
    target: 10,
    unit: "hours",
    weekStartDate: "2026-08-31",
    linkedType: "study",
    completed: false,
  },
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const contactMessages = [];

function renderWeeklyPlanner() {
  const weeklyPlanner = document.getElementById("weekly-planner");

  weeklyPlanner.innerHTML = "";

  days.forEach(function (day) {
    const dayColumn = document.createElement("div");
    dayColumn.classList.add("day-column");

    const dayTitle = document.createElement("h3");
    dayTitle.classList.add("day-name");
    dayTitle.textContent = day;

    dayColumn.appendChild(dayTitle);
    weeklyPlanner.appendChild(dayColumn);
  });
}

function createScheduleCard(block) {
}

function renderScheduleBlocks() {
}

renderWeeklyPlanner();