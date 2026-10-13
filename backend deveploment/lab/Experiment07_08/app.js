// Store tasks
let tasks = [];

// Get HTML elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// Task class
class Task {
    constructor(title) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.completed = false;
    }
}

// Display tasks
const renderTasks = () => {
    list.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.title;

        if (task.completed) {
            span.classList.add("done");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-btn");

        li.appendChild(span);
        li.appendChild(deleteBtn);

        li.dataset.id = task.id;
        list.appendChild(li);
    });
};

// Add a task
const addTask = () => {
    const title = input.value.trim();

    if (title === "") {
        alert("Please enter a task.");
        input.focus();
        return;
    }

    tasks = [...tasks, new Task(title)];

    input.value = "";
    renderTasks();
    input.focus();
};

// Add button event
addBtn.addEventListener("click", addTask);

// Enter key event
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Complete or delete a task
list.addEventListener("click", (event) => {
    const li = event.target.closest("li");

    if (!li) {
        return;
    }

    const id = Number(li.dataset.id);

    if (event.target.classList.contains("delete-btn")) {
        tasks = tasks.filter((task) => task.id !== id);
    } else {
        tasks = tasks.map((task) =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        );
    }

    renderTasks();
});