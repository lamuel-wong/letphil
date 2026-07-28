// ============================================================
// 🐛  LOOPS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This loop should log numbers 1 through 10.
// It only logs 1 through 9. What's wrong?

// for (let i = 1; i < 10; i++) {
//   console.log(i);
// }

// What's wrong ↓
// It only logs 1 through 9 because i < 10, it stops once it reaches 10 instead of including it
// Your fix ↓
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should calculate the sum of 1 through 5 (answer: 15).
// It always logs 0. What's wrong?

// for (let i = 1; i <= 5; i++) {
//   let total = 0;
//   total += i;
// }
// console.log("Sum: " + total);

// What's wrong ↓
// total is declared in the for loop and assigned the value of 0, resulting in always being 0 instead of the sum being calculated
// there is also a reference error since total is not defined outside the for loop and so can't be logged.
// Your fix ↓

let total = 0;
for (let i = 1; i <= 5; i++) {
  total += i;
}
console.log("Sum: " + total);

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This loop should log all ODD numbers from 1 to 10,
// then log "Done!" at the end.
// Instead it logs nothing and skips straight to "Done!".
// There are TWO bugs. Find both.

// for (let i = 1; i <= 10; i++) {
//   if (i % 2 === 0) {
//     console.log(i);
//   } else {
//     continue;
//   }
// }
// console.log("Done!");

// Bug 1 ↓
// On line 58, it logs even numbers instead of odd
// Bug 2 ↓
// On line 61, the continue in the else statement means that if it is odd, it just skips the iteration instead of logging the odd number 
// Your fix ↓

for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;
  } else {
    console.log(i);
  }
}
console.log("Done!");