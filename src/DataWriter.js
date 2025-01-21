import { createTask } from "./DOMController";
import { createItem } from "./logic";

// I need to figure out how I want to store the data.
// Probably going to start the program by
//  1. Check if any data is written
//  2. If not, write a template set of data for todo, load that data
//  3. If so, write the saved data
//Assuming I'll just use csv format for data
// name, "desc",date,{tag,tag,tag}
// Name is a string, desc is a string, date will likely be a unix timestamp,
// each tag will be a string and finished will be a boolean
//Function to write data
//Function to read data
//Function to load data
//Function to wipe data
//That should be it!

// Create an index of task names

let taskArr = [];

document.addEventListener('DOMContentLoaded', () => {
    taskArr = localStorage.getItem('taskArr').split(',') || [];
    for (let taskName of taskArr) {
        readTask(taskName);
    }
});

function readTask(taskName) {
    // Takes: name, "desc",date,{tag,tag,tag}
    const TASK_CSV = localStorage.getItem(taskName);
    const name = TASK_CSV.split(",")[0];
    const desc = TASK_CSV.slice(TASK_CSV.indexOf('"'), TASK_CSV.indexOf('"', 2));
    const date = TASK_CSV.slice(TASK_CSV.indexOf('"', 2)).split(',')[0];
    const tags = TASK_CSV.slice(TASK_CSV.indexOf('{'), TASK_CSV.indexOf('}')).split(',');
    createTask(createItem(name, desc, date, tags));
    return { name, desc, date, tags };

}

function writeTask(task) {
    localStorage.setItem(task.getName(), task.toCSV());
    if (!taskArr.includes(task.getName())) {
        taskArr.push(task.getName());
        localStorage.setItem('taskArr', taskArr);
    }
}

function wipeData() {
    localStorage.clear();
}


export { readTask, writeTask, wipeData };