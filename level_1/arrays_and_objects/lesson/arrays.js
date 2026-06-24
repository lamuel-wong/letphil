// Declaring and Manipulating Arrays
// fruits = ["Apple", "Banana", "Cherry"];
// console.log(fruits);

// console.log(fruits[0]);
// console.log(fruits[1]);

// fruits[1] = "Blueberry";
// console.log(fruits);
// console.log(fruits.length);

// Array methods
// push - adds to end
// fruits.push("Mango");
// console.log(fruits);

// pop - removes from end
// fruits.pop();
// console.log(fruits);

// shift - removes from beginning
// fruits.shift();
// console.log(fruits);

// unshift - adds to beginning
// fruits.unshift("Grapes");
// console.log(fruits);

// splice - add / remove elements
// fruits.splice(1, 1, "Peach");
// console.log(fruits);

// fruits.splice(1, 2);
// console.log(fruits);

// map
const numbers = [1, 2, 3, 4, 5];
console.log(`numbers =`, numbers);
const doubled = numbers.map(num => num * 2);
console.log("doubled =", doubled);
console.log("numbers =", numbers);

// filter 
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);