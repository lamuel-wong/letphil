// ============================================================
// 🐛  DATA TYPES — HOMEWORK  |  DEBUG TASKS
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This tries to build a greeting using the customer's first name.
// It logs "undefined Rivera" instead of "Alex Rivera". What's wrong?

const customerName = "alex rivera";
const cleanName    = customerName.trim().toLowerCase();

// Trying to capitalise the first letter:
// const titled = cleanname[0].toUpperCase() + cleanname.slice(1);
// console.log(`Hello, ${titled}!`);

// What's wrong ↓
// In line 16, cleanname is not the same as the cleanName variable from line 13
// Your fix ↓
const titled = cleanName[0].toUpperCase() + cleanName.slice(1);
console.log(`Hello, ${titled}!`);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This calculates the total for an order item.
// The result is "79.992" instead of 159.98. What's wrong?

const itemPrice = "79.99";  // from a form input
const itemQty   = 2;

const lineTotal = itemPrice * itemQty;  // works — * coerces
// const receipt   = `Total: $${itemPrice + lineTotal}`; // bug here

// console.log(receipt); // "Total: $79.99159.98" — wrong

// What's wrong ↓
// In line 35, itemPrice + lineTotal concatenates the string value from itemPrice with the value from lineTotal.
// If the intention is to log the total, lineTotal is enough to get the result. 
// Your fix ↓
const receipt   = `Total: $${lineTotal}`; 
console.log(receipt);

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This builds a discount label and checks if a code is valid.
// There are TWO bugs — one produces a wrong boolean,
// one produces a wrong string.

const rawCode     = "  save10  ";
const validCode   = "SAVE10";

// Bug 1: comparing without cleaning
// const isValid = rawCode === validCode;
// console.log(`Code valid: ${isValid}`);  // false — wrong, should be true

// Bug 2: building a label with the raw code
// const label = `Discount code: ${rawCode} — valid: ${isValid}`;
// console.log(label); // shows messy whitespace in the label

// Bug 1 ↓
// rawCode and validCode are being compared without being parsed and cleaned such as removing whitespace and fixing cases/capitalisation. This leads to results alwayys being false.
// Bug 2 ↓
// Since rawCode is used to build the label, it has not been parsed and cleaned, resulting in messy whitespace in the output.
// Your fix for both ↓
cleanCode = rawCode.trim().toUpperCase();
const isValid = cleanCode === validCode;
console.log(`Code valid: ${isValid}`);

const label = `Discount code: ${cleanCode} — valid: ${isValid}`;
console.log(label); 