let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let taskId = taskList.length > 0 ? Math.max(...taskList.map(t => t.id)) + 1 : 0;

let taskInput = document.getElementById('task-input');
let taskContainer = document.getElementById('task-list');

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function renderTask(task) {
    let li = document.createElement("li");
    li.style.textTransform = "capitalize";

    // Texte de la tâche
    let taskText = document.createElement("span");
    taskText.innerText = task.text;
    li.appendChild(taskText);

    // Groupe de boutons
    let buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    // Buton Modifier
    let buttonEditer = document.createElement("button");
    buttonEditer.innerText = "Modifier";
    buttonEditer.onclick = function () {
        let newText = prompt("Entrer le nouveau To-Do", task.text);
        if (newText && newText.trim() !== "") {
            task.text = newText.trim();
            taskText.textContent = task.text;
            saveTasks();
        }
    };

    // Buton Supprimer
    let buttonSupprimer = document.createElement("button");
    buttonSupprimer.innerText = "Supprimer";
    buttonSupprimer.onclick = function () {
        taskList = taskList.filter(t => t.id !== task.id);
        taskContainer.removeChild(li);
        saveTasks();
    };

    buttonGroup.appendChild(buttonEditer);
    buttonGroup.appendChild(buttonSupprimer);
    li.appendChild(buttonGroup);
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

window.onload = function () {
    taskList.forEach(task => renderTask(task));
};
