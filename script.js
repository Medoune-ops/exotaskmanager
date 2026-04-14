const buttons = document.querySelectorAll(".nav-btn");

buttons.forEach(button => {
    button.classList.add("hover:bg-blue-500", "hover:text-white");
    
    button.addEventListener("click", () => {
        buttons.forEach(btn => {
            btn.classList.remove("bg-blue-500", "text-white", "active");
        });
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
            <td class="p-4 text-gray-800">
                <span>${taskText}</span>
            </td>
            <td class="p-4 text-center">
                <span class="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">En cours</span>
            </td>
            <td class="p-4 text-right">
                <button class="delete-btn text-red-500 hover:text-red-700 font-medium transition cursor-pointer px-4">Supprimer</button>
            </td>`;

        taskList.appendChild(row);
        taskInput.value = ""; 
    }
});


taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});