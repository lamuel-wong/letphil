// ============================================================
// 🐛  ARRAYS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should log the middle element ("C") of the array.
// Instead it logs undefined. What's wrong?

// const letters = ["A", "B", "C", "D", "E"];
// const middleIndex = letters.length / 2;
// console.log(letters[middleIndex]);

// What's wrong ↓
// letters.length / 2 gives 2.5 but the middle index of the array is 2. There is no 2.5 index so it logs undefined.
// Your fix ↓

const letters = ["A", "B", "C", "D", "E"];
const middleIndex = (letters.length - 1) / 2;
console.log(letters[middleIndex]);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should build a total of all prices.
// It logs NaN instead of a number. What's wrong?

// const prices = [10, 20, 30, 40];
// let total = 0;

// for (let i = 0; i <= prices.length; i++) {
//   total += prices[i];
// }

// console.log("Total: $" + total);

// What's wrong ↓
// The for loop condition 'i <= prices.length' uses <= instead of < to loop through the prices array, so in the last loop, prices[4] is undefined. 
// Your fix ↓

const prices = [10, 20, 30, 40];
let total = 0;

for (let i = 0; i < prices.length; i++) {
  total += prices[i];
}

console.log("Total: $" + total);

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This code is supposed to find the highest score in the array
// and log the winner's name. It always logs the wrong winner.
// There are TWO bugs. Find both.

// const names  = ["Alice", "Bob", "Carol", "Dave"];
// const scores = [82, 91, 78, 95];

// let topIndex  = 1;
// let topScore  = 0;

// for (let i = 0; i < scores.length; i++) {
//   if (scores[i] > topScore) {
//     topScore = scores[i];
//     topIndex = i;
//   }
// }

// console.log("Winner: " + names[topIndex] + " with " + topScore);

// Bug 1 ↓
// It actually logs the right winner lol. But the topIndex should start at 0, not 1, since arrays start at index 0.
// Bug 2 ↓
// topScore should seed with the first actual score or value from the array to be compared against instead of an unrelated value.
// Your fix ↓

const names  = ["Alice", "Bob", "Carol", "Dave"];
const scores = [82, 91, 78, 95];

let topIndex  = 0;
let topScore  = scores[0];

for (let i = 0; i < scores.length; i++) {
  if (scores[i] > topScore) {
    topScore = scores[i];
    topIndex = i;
  }
}

console.log("Winner: " + names[topIndex] + " with " + topScore);