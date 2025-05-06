let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let taskId = taskList.length > 0 ? Math.max(...taskList.map(t => t.id)) + 1 : 0;

let taskInput = document.getElementById('task-input');
let taskContainer = document.getElementById('task-list');

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function renderTask(task) {
    let li = document.createElement("li");
    li.innerText = task.text;
    li.style.listStyleType = "none";
    li.style.marginLeft = "25px";
    li.style.marginTop = "10px";
    li.style.listStyleType = "numbers";
    li.style.textTransform = "capitalize";
    // Bouton Modifier
    let buttonEditer = document.createElement("button");
    buttonEditer.innerText = "Modifier";
    buttonEditer.style.marginLeft = "15px";
    buttonEditer.style.backgroundColor = "whitesmoke";
    buttonEditer.style.color = "black";
    buttonEditer.style.cursor = "pointer";

    buttonEditer.onclick = function () {
        let newText = prompt("Entrer le nouveau To-Do", task.text);
        if (newText && newText.trim() !== "") {
            task.text = newText.trim();
            li.firstChild.textContent = task.text;
            saveTasks();
            li.appendChild(buttonEditer);
            li.appendChild(buttonSupprimer);
        }
    };

    // Bouton Supprimer
    let buttonSupprimer = document.createElement("button");
    buttonSupprimer.innerText = "Supprimer";
    buttonSupprimer.style.marginLeft = "15px";
    buttonSupprimer.style.backgroundColor = "red";
    buttonSupprimer.style.color = "black";
    buttonSupprimer.style.cursor = "pointer";

    buttonSupprimer.onclick = function () {
        taskList = taskList.filter(t => t.id !== task.id);
        taskContainer.removeChild(li);
        saveTasks();
    };

    li.appendChild(buttonEditer);
    li.appendChild(buttonSupprimer);
    taskContainer.appendChild(li);
}

function addlist() {
    let taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    let task = { id: taskId++, text: taskText };
    taskList.push(task);
    saveTasks();
    renderTask(task);
    taskInput.value = "";
}

// Charger les tâches au démarrage
window.onload = function () {
    taskList.forEach(task => renderTask(task));
};
