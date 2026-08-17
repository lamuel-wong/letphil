// ============================================================
// 🐛  ARRAY METHODS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should create a new array of prices with tax added (10%).
// Instead it logs an array of undefined. What's wrong?

// const prices = [29.99, 49.99, 14.99, 99.99];

// const withTax = prices.map(function(price) {
//   const taxed = price * 1.10;
//   console.log(taxed);
// });

// console.log("With tax:", withTax);

// What's wrong ↓
// The map method creates a new array after transforming the original but is missing a return, filling the new array with undefined.
// Your fix ↓

const prices = [29.99, 49.99, 14.99, 99.99];

const withTax = prices.map(function(price) {
  const taxed = price * 1.10;
  console.log(taxed);
  return taxed;
});

console.log("With tax:", withTax);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This should return only the pending orders.
// But it returns an empty array. Why?

const orders = [
  { id: 1, status: "delivered" },
  { id: 2, status: "pending"   },
  { id: 3, status: "pending"   },
  { id: 4, status: "cancelled" }
];

// const pending = orders.filter(function(order) {
//   return order.status = "pending";
// });

// console.log(pending);

// What's wrong ↓
// In line 52, the = assigns "pending" to order.status, resulting in every object having the pending status, it should be ===.
// Your fix ↓

const pending = orders.filter(function(order) {
  return order.status === "pending";
});

console.log(pending);

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This should calculate the total value of all orders
// (quantity × price for each). It produces a wrong result.
// There are TWO bugs.

// const lineItems = [
//   { product: "Shirt",  quantity: 2, price: 29.99 },
//   { product: "Jeans",  quantity: 1, price: 59.99 },
//   { product: "Jacket", quantity: 3, price: 89.99 }
// ];

// const orderTotal = lineItems.reduce(function(acc, item) {
//   return acc + item.quantity * item.price;
// });

// console.log("Order total: $" + orderTotal);

// Bug 1 ↓
// The reduce method is missing its initial value, resulting in acc starting as the first object.
// Bug 2 ↓
// Hint: run it and read the output carefully.
// What is the value on the first iteration?
// '$[object Object]59.99269.96'. Due to acc as the first object, the result of the number operation from calculating the total value gets concatenated as it is coerced with objects.

// Your fix ↓
const lineItems = [
  { product: "Shirt",  quantity: 2, price: 29.99 },
  { product: "Jeans",  quantity: 1, price: 59.99 },
  { product: "Jacket", quantity: 3, price: 89.99 }
];

const orderTotal = lineItems.reduce(function(acc, item) {
  return acc + item.quantity * item.price;
}, 0);

console.log("Order total: $" + orderTotal);