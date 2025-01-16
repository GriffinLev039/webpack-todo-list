import { itemArray } from "./logic";


const container = document.getElementById('content');

(() => {
    const newTaskBtn = document.createElement('button');
    newTaskBtn.id = "newTaskBtn";
    newTaskBtn.textContent = "New Task";

    newTaskBtn.addEventListener('click', () => {
        let name = prompt("Name:");
        let date = prompt("Date");
        let desc = prompt("desc");

        createTask(itemArray.addItem(name, desc, date));
    });

    container.appendChild(newTaskBtn);
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
    taskTags.textContent = "WIP";
    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', () => {
        container.removeChild(taskContainer);
        itemArray.removeItem(item.getName());
    });
    removeBtn.textContent = "Remove";

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDesc);
    taskContainer.appendChild(taskDate);
    taskContainer.appendChild(taskTags);
    taskContainer.appendChild(removeBtn);
    container.appendChild(taskContainer);
}




export { createTask };