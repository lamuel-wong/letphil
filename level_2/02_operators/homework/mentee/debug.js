// ============================================================
// 🐛  OPERATORS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should calculate a 15% tip but the result is wrong.

// const billAmount = 80;
// const tipPercent = 15;
// const tipAmount  = billAmount % tipPercent;
// console.log("Tip: $" + tipAmount);

// What's wrong ↓
// On line 15 and 16, tipPercent is a whole number instead of a percentage, billAmount % tipPercent also only just gives the remainder of billAmount / tipPercent, not the actual tipAmount.
// Your fix ↓
const billAmount = 80;
const tipPercent = 0.15;
const tipAmount  = billAmount * tipPercent;
console.log("Tip: $" + tipAmount);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// The developer wants to track a countdown timer.
// Something is wrong with how the variable is declared.

// const countdown = 10;
let countdown = 10;
countdown -= 1;
countdown -= 1;
countdown -= 1;
console.log("Countdown: " + countdown);

// What's wrong ↓
// countdown is a const variable and can't be changed during execution of the program
// Your fix ↓
// let countdown = 10;

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This code is supposed to check if two usernames match.
// It always logs true even when they shouldn't match.
// There are also two style issues (not errors, but bad practice).
// Find the logic bug AND the two style issues.

// var username1 = "gamer99";
// var username2 = "Gamer99";
// console.log("Names match: " + (username1 == username2));

// Logic bug ↓
// On line 55, username1 and username2 are being compared with == which can produce unexpected or unpredictable results instead of ===. 
// Style issue 1 ↓
// var is being used to declare variables instead of let or const
// Style issue 2 ↓
// username1 and username2 should be userName1 and userName2 as camel case should be used when naming variables
// Your fix ↓
const userName1 = "gamer99";
const userName2 = "Gamer99";
console.log("Names match: " + (userName1 === userName2));