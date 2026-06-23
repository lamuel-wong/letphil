const tasks = [] // init where todos will go

while (true) {
    // ask for input
    let task = prompt("Enter a task (or type 'done' to finish)");

    // check if user input is done or Done or DONE
    if (task.toLowerCase() === 'done') {
        break // if done, break out of while loop
    };

    tasks.push(task); // add user task input to tasks
};

// To display tasks
console.log("Your Todo List:");

let i = 0;
tasks.forEach(function(task) {
    console.log(`${i + 1}. ${tasks[i]}`);
    i++;
});

// let i = 0;
// do {
//     console.log(`${i + 1}. ${tasks[i]}`);
//     i++;
// } while (i !== tasks.length)

// let i = 0;
// while (i !== tasks.length) {
//     console.log(`${i + 1}. ${tasks[i]}`);   
//     i++;
// }

// for (let i = 0; i < tasks.length; i++) {
//     console.log(`${i + 1}. ${tasks[i]}`);
// };

// tasks.forEach((task, index) => {
//     console.log(`${index + 1}. ${task}`);
// });
