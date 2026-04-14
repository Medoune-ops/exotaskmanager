const buttons = document.querySelectorAll(".nav-btn");

buttons.forEach(button => {
    button.classList.add("hover:bg-blue-500", "hover:text-white");
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("bg-blue-500", "text-white", "active"));
        button.classList.add("bg-blue-500", "text-white", "active");
    });
});

const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim(); 
    if (taskText !== "") {
        const row = document.createElement('tr');
        row.className = "border-b border-gray-100 hover:bg-gray-50 transition";
        row.innerHTML = `
            <td class="p-4 text-gray-800 task-text">
                <span>${taskText}</span>
            </td>
            <td class="p-4 text-center">
                <span class="status-badge px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full cursor-pointer select-none">En cours</span>
            </td>
            <td class="p-4 text-right flex justify-end gap-2">
                <button class="edit-btn text-blue-500 hover:text-blue-700 font-medium transition cursor-pointer">Modifier</button>
                <button class="delete-btn text-red-500 hover:text-red-700 font-medium transition cursor-pointer">Supprimer</button>
            </td>`;

        const badge = row.querySelector('.status-badge');
        const deleteBtn = row.querySelector('.delete-btn');
        const editBtn = row.querySelector('.edit-btn');
        const taskTd = row.querySelector('.task-text'); // On cible le TD pour l'édition
        badge.addEventListener('click', () => {
            const span = taskTd.querySelector('span'); // On cherche le span actuel
            if (badge.innerText === "En cours") {
                badge.innerText = "Complétée";
                badge.classList.replace("bg-yellow-100", "bg-green-100");
                badge.classList.replace("text-yellow-700", "text-green-700");
                if(span) span.classList.add("line-through", "text-gray-400");
            } else {
                badge.innerText = "En cours";
                badge.classList.replace("bg-green-100", "bg-yellow-100");
                badge.classList.replace("text-green-700", "text-yellow-700");
                if(span) span.classList.remove("line-through", "text-gray-400");
            }
        });

        deleteBtn.addEventListener('click', () => row.remove());

        editBtn.addEventListener('click', () => {
            if (editBtn.innerText === "Modifier") {
                const currentSpan = taskTd.querySelector('span');
                const currentText = currentSpan ? currentSpan.innerText : "";
                taskTd.innerHTML = `<input type="text" class="edit-input border-b-2 border-blue-500 outline-none w-full bg-transparent" value="${currentText}">`;
                const inputField = taskTd.querySelector('.edit-input');
                inputField.focus(); 
                inputField.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') editBtn.click();
                });
                editBtn.innerText = "Enregistrer";
                editBtn.classList.replace("text-blue-500", "text-green-600");
            } else {
                const inputField = taskTd.querySelector('.edit-input');
                const newText = inputField.value.trim();       
                if (newText !== "") {
                    taskTd.innerHTML = `<span>${newText}</span>`;
                    editBtn.innerText = "Modifier";
                    editBtn.classList.replace("text-green-600", "text-blue-500");
                }
            }
        });

        taskList.appendChild(row);
        taskInput.value = ""; 
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});