// ============================================================
// 🐛  FUNCTIONS — HOMEWORK  |  DEBUG TASKS
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This arrow function should return the full name
// but always returns undefined. What's wrong?

// const getFullName = (first, last) => {
//   first + " " + last;
// };

// console.log(getFullName("Alex", "Rivera"));

// What's wrong ↓
// Missing return keyword inside the braces results in nothing being assigned to getFullName
// Your fix — write TWO versions:
//   a) Fix by adding return inside the braces
//   b) Fix by removing the braces (one-liner implicit return)

// const getFullName = (first, last) => {
//   return first + " " + last;
// };

// console.log(getFullName("Alex", "Rivera"));

const getFullName = (first, last) => first + " " + last;
console.log(getFullName("Alex", "Rivera"));

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This should return "Admin", "Moderator", or "Member"
// depending on role. It works for "admin" but returns
// undefined for everything else. What's wrong?

// function getRoleLabel(role) {
//   if (role === "admin") {
//     return "Admin";
//   } else if (role === "mod") {
//     ("Moderator");
//   } else {
//     ("Member");
//   }
// }

// console.log(getRoleLabel("admin")); // "Admin" ✅
// console.log(getRoleLabel("mod")); // undefined ❌
// console.log(getRoleLabel("member")); // undefined ❌

// What's wrong ↓
// Only (role === "admin") returns "Admin" while the else if (role === "mod") and else does not return anything
// Your fix ↓

// function getRoleLabel(role) {
//   if (role === "admin") {
//     return "Admin";
//   } else if (role === "mod") {
//     return "Moderator";
//   } else {
//     return "Member";
//   }
// }

const getRoleLabel = (role) =>
  role === "admin" ? "Admin" : role === "mod" ? "Moderator" : "Member";

console.log(getRoleLabel("admin"));
console.log(getRoleLabel("mod"));
console.log(getRoleLabel("member"));

// Bonus: rewrite the whole function as an arrow function
// using nested ternaries (just to see what it looks like —
// then write a comment about whether you'd actually use it).

// I would probably stick to using if/else as they are more readable than nested ternaries for me. 

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This discount calculator has TWO bugs.
// Both cause wrong math — find them both.

// const applyDiscount = (price, discountPercent = 10) => {
//   const discountAmount = price * discountPercent;
//   const finalPrice = price + discountAmount;
//   return finalPrice;
// };

// console.log(applyDiscount(100, 20)); // expected: 80
// console.log(applyDiscount(50)); // expected: 45

// Bug 1 (math) ↓
// The discountAmount math needs to convert the percentage into a decimal first 
// Bug 2 (math) ↓
// The finalPrice math has to deduct the discountAmount from the price, not add to it

// Your fix ↓
const applyDiscount = (price, discountPercent = 10) => {
  const discountAmount = price * discountPercent / 100;
  const finalPrice = price - discountAmount;
  return finalPrice;
};

console.log(applyDiscount(100, 20)); // expected: 80
console.log(applyDiscount(50)); // expected: 45