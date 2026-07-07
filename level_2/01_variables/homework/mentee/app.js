// ============================================================
// 🏠  VARIABLES — HOMEWORK
// ============================================================
// Complete each task using only what you learned in class:
//   - const and let
//   - declaring, assigning, reassigning
//   - console.log()
//   - string + number combination with +
//
// No DOM. No HTML edits. Open DevTools to see your output.
// ============================================================

// ----------------------------------------------------------
// TASK 1 — Your personal profile
// ----------------------------------------------------------
// Declare the following using the correct keyword (const or let).
// Add a comment next to each one explaining WHY you chose that keyword.
//
//   fullName    → your full name as a string
//   age         → your age as a number
//   city        → the city you live in
//   isStudent   → true or false
//
// Log all four to the console.

console.log("TASK 1:");

const fullName = "Lamuel Wong"; // const since my name would not change
let age = 25; // let since my age can be updated as I get older
let city = "Toronto"; // let since my address can change when I move later
let isStudent = true; // let since my status as a student can change 

// console.log(fullName + "\n" + age + "\n" + city + "\n" + isStudent);
console.log(fullName);
console.log(age);
console.log(city);
console.log(isStudent);

// ----------------------------------------------------------
// TASK 2 — Update what can change
// ----------------------------------------------------------
// Reassign city to a different city.
// Reassign isStudent to the opposite value.
// Log both after reassigning.
//
// Then try to reassign fullName.
// Read the error, then comment that line out.

console.log("TASK 2:");

city = "Waterloo";
isStudent = false;
console.log(city);
console.log(isStudent);

// fullName = "John Smith";

// ----------------------------------------------------------
// TASK 3 — Undefined in the wild
// ----------------------------------------------------------
// Declare a let called favoriteMovie — do NOT assign a value.
// Log it. Write what you see as a comment.
//
// Now assign it a movie title.
// Log it again.

console.log("TASK 3:");

let favoriteMovie;
console.log(favoriteMovie);
favoriteMovie = "Interstellar";
console.log(favoriteMovie);

// ----------------------------------------------------------
// TASK 4 — Build a product listing
// ----------------------------------------------------------
// You're building a small online store.
// Declare const variables for:
//
//   productName  → a made-up product name
//   productBrand → the brand name
//   productPrice → a price as a number
//   inStock      → true
//
// Log each variable on its own line.
// Then log: productName + " by " + productBrand + " — $" + productPrice

console.log("TASK 4:");

const productName = "Plain White T-shirt";
const productBrand = "UniqNo";
let productPrice = 20;
let inStock = true;

// console.log(productName + " by " + productBrand + " — $" + productPrice);
console.log(`${productName} by ${productBrand} — $${productPrice}`);

// ----------------------------------------------------------
// TASK 5 — Stock status update
// ----------------------------------------------------------
// Reassign inStock to false.
// Log: "In stock: " + inStock
//
// Try to reassign productName.
// Read the error and comment the line out.
// Why did this fail but inStock worked?
// Write your answer as a comment.

console.log("TASK 5:");

inStock = false;
console.log("In stock: " + inStock);

// productName = "Plain Black T-shirt";
// invalid assignment because productName is a const variable while inStock is let

// ----------------------------------------------------------
// TASK 6 — Fix the bad names
// ----------------------------------------------------------
// The variable names below are all invalid or poor practice.
// Rewrite each one correctly, declare it with any value, and log it.
//
//   2ndPlayer     → fix it
//   my score      → fix it
//   X             → rename to something descriptive, then declare it
//   GaMeLeVeL     → fix the casing

console.log("TASK 6:");

const secondPlayer = "Biggs";
let myScore = 0;
let livesRemaining = 3;
let gameLevel = 1;

console.log(secondPlayer);
console.log(myScore);
console.log(livesRemaining);
console.log(gameLevel);

// ----------------------------------------------------------
// TASK 7 — Two-step declaration
// ----------------------------------------------------------
// Declare a let called highScore — do NOT assign a value.
// Log it.
//
// Assign highScore the value 500.
// Log it.
//
// Reassign highScore to 750.
// Log it.
//
// You should see three console lines: undefined → 500 → 750

console.log("TASK 7:");

let highScore;
console.log(highScore);
highScore = 500;
console.log(highScore);
highScore = 750;
console.log(highScore);


// ----------------------------------------------------------
// TASK 8 — Connect the variables
// ----------------------------------------------------------
// Declare these consts:
//   appName    → "TaskMaster"
//   version    → 3
//   authorName → your name
//
// Log: appName + " v" + version + " — built by " + authorName
// Expected format: "TaskMaster v3 — built by [your name]"

console.log("TASK 8:");

const appName = "TaskMaster";
const version = 3;
const authorName = "Lamuel"

console.log(`${appName} v${version} — built by ${authorName}`);

// ----------------------------------------------------------
// ⭐ STRETCH GOAL
// ----------------------------------------------------------
// Declare a const called startYear with the value 2020.
// Declare a const called currentYear with the value 2025.
// Declare a let called yearsRunning = currentYear - startYear.
//
// Log: appName + " has been running for " + yearsRunning + " years."
//
// Then reassign currentYear... wait, can you? Why not?
// Write the answer as a comment.
// What keyword would you need if currentYear could change?

console.log("STRETCH GOAL:");

const startYear = 2020;
const currentYear = 2025;
let yearsRunning = currentYear - startYear;
console.log(`${appName} has been running for ${yearsRunning} years.`);

currentYear = 2026;
// currentYear cannot be reassigned because it is a const variable
// let would have to be used instead of const