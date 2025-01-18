import { itemArrayCTRL } from "./logic";

let currentState = "";

const container = document.getElementById('content');
const btnContainer = document.createElement('div');
btnContainer.id = "btnContainer";
container.appendChild(btnContainer);
const subContainer = document.createElement('div');
subContainer.id = "subContainer";
container.appendChild(subContainer);
(() => {
    const newTaskBtn = document.createElement('button');
    newTaskBtn.id = "newTaskBtn";
    newTaskBtn.textContent = "New Task";

    const defaultProjBtn = document.createElement('button');
    defaultProjBtn.addEventListener('click', () => {
        clearTasks();
        showTasks("");

    });
    defaultProjBtn.textContent = "Show All";

    newTaskBtn.addEventListener('click', () => {
        let name = prompt("Name:");
        let date = prompt("Date");
        let desc = prompt("desc");
        let tags = prompt("Enter tags as comma-separated list:");
        tags = tags.split(',');
        createTask(itemArrayCTRL.addItem(name, desc, date, tags));
    });


    const newProjBtn = document.createElement('button');
    newProjBtn.addEventListener('click', () => {
        const tag = prompt("Enter a category for the project");
        createProject(tag);
    });
    newProjBtn.textContent = 'New Project';

    const btnSubContainer = document.createElement('div');
    btnSubContainer.id = "btnSubContainer";
    btnSubContainer.appendChild(newTaskBtn);
    btnSubContainer.appendChild(newProjBtn);
    btnContainer.appendChild(btnSubContainer);
    btnContainer.appendChild(defaultProjBtn);
})();


function createTask(item) {
    const taskContainer = document.createElement('div');
    const taskTitle = document.createElement('h3');
    taskTitle.textContent = item.getName();
    const taskDesc = document.createElement('p');
    taskDesc.textContent = item.getDesc();
    const taskDate = document.createElement('p');
    taskDate.textContent = item.getDate();
    const taskTags = document.createElement('p');
    taskTags.textContent = item.getTagString();
    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', () => {
        subContainer.removeChild(taskContainer);
        itemArrayCTRL.removeItem(item.getName());
    });
    removeBtn.textContent = "Remove";

    const editBtn = document.createElement('button');
    editBtn.addEventListener('click', () => {
        item.setName(prompt("Name: "));
        item.setDate(prompt("Date: "));
        item.setDesc(prompt("Desc: "));
        clearTasks();
        showTasks(currentState);

    });
    editBtn.textContent = "Edit";
    const textContainer = document.createElement('div');
    textContainer.classList.add("textContainer");
    const topText = document.createElement('div');
    const btmText = document.createElement('div');

    topText.appendChild(taskTitle);
    topText.appendChild(taskDate);
    btmText.appendChild(taskDesc);
    btmText.appendChild(taskTags);

    const optionContainer = document.createElement('div');
    optionContainer.classList.add("optionContainer");
    optionContainer.appendChild(removeBtn);
    optionContainer.appendChild(editBtn);
    // taskContainer.appendChild(taskTitle);
    // taskContainer.appendChild(taskDesc);
    // taskContainer.appendChild(taskDate);
    // taskContainer.appendChild(taskTags);
    // taskContainer.appendChild(removeBtn);
    // taskContainer.appendChild(editBtn);
    textContainer.appendChild(topText);
    textContainer.appendChild(btmText);
    taskContainer.appendChild(textContainer);
    taskContainer.appendChild(optionContainer);
    subContainer.appendChild(taskContainer);
}

function createProject(tag) {
    currentState = tag;
    const projBtn = document.createElement('button');
    projBtn.addEventListener('click', () => {
        clearTasks();
        showTasks(tag);
    });
    projBtn.textContent = "Show " + tag + " Tasks.";
    btnContainer.appendChild(projBtn);
}

function clearTasks() {
    while (subContainer.hasChildNodes()) {
        subContainer.removeChild(subContainer.children[0]);
    }
}

function showTasks(tag) {
    let targetArray;
    if (tag === ""){
        targetArray = itemArrayCTRL.getItems();
    } else {
        targetArray = itemArrayCTRL.tagSort(tag);
    }
    for (let item of targetArray) {
        createTask(item);
    }
}



export { createTask, createProject };