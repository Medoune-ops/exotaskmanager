const buttons = document.querySelectorAll(".nav-btn");
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
function createTaskRow(text, isCompleted = false) {
    const row = document.createElement('tr');
    row.className = "border-b border-gray-100 hover:bg-gray-50 transition";
        const badgeContent = isCompleted ? `<span>✓</span> Complétée` : "En cours";
    const badgeColor = isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
    const textDecoration = isCompleted ? "line-through text-gray-400" : "";

    row.innerHTML = `
        <td class="p-4 text-gray-800 task-text">
            <span class="${textDecoration}">${text}</span>
        </td>
        <td class="p-4 text-center">
            <span class="status-badge px-3 py-1 text-xs font-medium ${badgeColor} rounded-full cursor-pointer select-none">
                ${badgeContent}
            </span>
        </td>
        <td class="p-4 text-right flex justify-end gap-2">
            <button class="edit-btn text-blue-500 hover:text-blue-700 font-medium transition cursor-pointer">Modifier</button>
            <button class="delete-btn text-red-500 hover:text-red-700 font-medium transition cursor-pointer px-4">Supprimer</button>
        </td>`;
    const badge = row.querySelector('.status-badge');
    const deleteBtn = row.querySelector('.delete-btn');
    const editBtn = row.querySelector('.edit-btn');
    const taskTd = row.querySelector('.task-text');
badge.addEventListener('click', () => {
const span = taskTd.querySelector('span');
        if (badge.innerText.includes("En cours")) {
            badge.innerHTML = `<span>✓</span> Complétée`;
            badge.classList.replace("bg-yellow-100", "bg-green-100");
            badge.classList.replace("text-yellow-700", "text-green-700");
            if(span) span.classList.add("line-through", "text-gray-400");
        } else {
            badge.innerText = "En cours";
            badge.classList.replace("bg-green-100", "bg-yellow-100");
            badge.classList.replace("text-green-700", "text-yellow-700");
            if(span) span.classList.remove("line-through", "text-gray-400");
        }
        saveTasks(); 
    });
    deleteBtn.addEventListener('click', () => {
        row.remove();
        saveTasks(); 
    });
editBtn.addEventListener('click', () => {
        if (editBtn.innerText === "Modifier") {
const currentSpan = taskTd.querySelector('span');
const currentText = currentSpan ? currentSpan.innerText : "";
            taskTd.innerHTML = `<input type="text" class="edit-input border-b-2 border-blue-500 outline-none w-full bg-transparent" value="${currentText}">`;
 const inputField = taskTd.querySelector('.edit-input');
            inputField.focus();
            inputField.addEventListener('keypress', (e) => { if (e.key === 'Enter') editBtn.click(); });
            editBtn.innerText = "Enregistrer";
            editBtn.classList.replace("text-blue-500", "text-green-600");
        } else {
const inputField = taskTd.querySelector('.edit-input');
const newText = inputField.value.trim();
            if (newText !== "") {
                taskTd.innerHTML = `<span>${newText}</span>`;
                editBtn.innerText = "Modifier";
                editBtn.classList.replace("text-green-600", "text-blue-500");
                saveTasks(); 
            }
        }
    });

    taskList.appendChild(row);
}
buttons.forEach(button => {
    button.classList.add("hover:bg-blue-500", "hover:text-white");
    button.addEventListener("click", () => {
     buttons.forEach(btn => btn.classList.remove("bg-blue-500", "text-white", "active"));
     button.classList.add("bg-blue-500", "text-white", "active");

const filterValue = button.innerText.trim();
      const rows = taskList.querySelectorAll('tr');
        rows.forEach(row => {
const statusBadge = row.querySelector('.status-badge').innerText;
            if (filterValue === 'Toutes') row.style.display = "";
 else if (filterValue === 'Complétées') row.style.display = (statusBadge.includes("Complétée") || statusBadge.includes("✓")) ? "" : "none";
 else if (filterValue === 'En cours') row.style.display = (statusBadge === "En cours") ? "" : "none";
        });
    });
});
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskRow(taskText);
        saveTasks(); 
        taskInput.value = "";
    }
});
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});
function saveTasks() {
    const tasks = [];
    const rows = document.querySelectorAll('#taskList tr');
    rows.forEach(row => {
 const span = row.querySelector('.task-text span');
    const badge = row.querySelector('.status-badge');
     if (span) {
       tasks.push({
       text: span.innerText,
      completed: badge.innerText.includes("Complétée")
            });
        }
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}
function loadTasks() {
    const savedTasks = localStorage.getItem('myTasks');
    if (savedTasks) {
 const tasks = JSON.parse(savedTasks);
   tasks.forEach(task => {
      createTaskRow(task.text, task.completed);
        });
    }
}
loadTasks();