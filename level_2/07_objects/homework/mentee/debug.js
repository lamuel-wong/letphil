// ============================================================
// 🐛  OBJECTS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should log the product's category but logs undefined.

const product = {
  name:     "Laptop",
  price:    999,
  category: "Electronics",
  stock:    10
};

// console.log(product.Category);

// What's wrong ↓
// Wrong case in line 21 for product.Category, should be product.category
// Your fix ↓
console.log(product.category);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should log each product's name and price.
// It logs "undefined undefined" for every product. Why?

// const inventory = [
//   { Name: "Shirt",  Price: 29.99 },
//   { Name: "Jeans",  Price: 59.99 },
//   { Name: "Jacket", Price: 89.99 }
// ];

// for (let i = 0; i < inventory.length; i++) {
//   console.log(inventory[i].name + " — $" + inventory[i].price);
// }

// What's wrong ↓
// Wrong case for the property names, they're case-sensitive but capitalised in the declaration, while in the for loop, they're lower case.
// Your fix ↓

const inventory = [
  { name: "Shirt",  price: 29.99 },
  { name: "Jeans",  price: 59.99 },
  { name: "Jacket", price: 89.99 }
];

for (let i = 0; i < inventory.length; i++) {
  console.log(inventory[i].name + " — $" + inventory[i].price);
}

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This should calculate the total value of all products
// (price × stock) and log it. It logs NaN. There are TWO bugs.

// const products = [
//   { name: "Phone",   price: 699, stock: 15 },
//   { name: "Tablet",  price: 499, stock: 8  },
//   { name: "Monitor", price: 329, stock: 12 }
// ];

// let totalValue = 0;

// for (let i = 0; i <= products.length; i++) {
//   totalValue += products[i].price * products.stock;
// }

// console.log("Total value: $" + totalValue);

// Bug 1 ↓
// In the for loop condition, i <= products.length results in the last iteration being undefined as it reaches one index past the end.
// Bug 2 ↓
// In line 73, products.stock is not referring to a specific index/product in the array, it should be products[i].stock
// Your fix ↓
const products = [
  { name: "Phone",   price: 699, stock: 15 },
  { name: "Tablet",  price: 499, stock: 8  },
  { name: "Monitor", price: 329, stock: 12 }
];

let totalValue = 0;

for (let i = 0; i < products.length; i++) {
  totalValue += products[i].price * products[i].stock;
}

console.log("Total value: $" + totalValue);