// // Sélection des éléments
// const input = document.querySelector("#taskInput");
// const addBtn = document.querySelector("#addBtn");
// const taskList = document.querySelector("#taskList");
// const sortBtn = document.querySelector("#sortBtn");

// function saveTasks() {
//     const tasks = [];

//     document.querySelectorAll("#taskList li").forEach(li => {
//         tasks.push({
//             text: li.querySelector("span").textContent,
//             completed: li.classList.contains("completed")
//         });
//     });

//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// addBtn.addEventListener("click", () => {
//     let taskText = input.value.trim();
//     if (taskText === "") return;

//     let li = document.createElement("li");
//     li.className = "flex justify-between items-center bg-gray-100 shadow-md p-2 mb-2 rounded-md cursor-pointer";

//     const textSpan = document.createElement("span");
//     textSpan.textContent = taskText;
//     li.appendChild(textSpan);

//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Supprimer";
//     deleteBtn.className = "bg-red-500 text-white px-3 py-1 rounded-md";

//     deleteBtn.addEventListener("click", (e) => {
//         e.stopPropagation();
//         li.remove();
//         saveTasks();
//     });

//     li.appendChild(deleteBtn);

//     const updateBtn = document.createElement("button");
//     updateBtn.textContent = "Modifier";
//     updateBtn.className = "bg-blue-500 text-white px-3 py-1 rounded-md";

//     updateBtn.addEventListener("click", (e) => {
//         e.stopPropagation();

//         const inputEdit = document.createElement("input");
//         inputEdit.type = "text";
//         inputEdit.value = textSpan.textContent;

//         textSpan.replaceWith(inputEdit);
//         inputEdit.focus();

//         inputEdit.addEventListener("keypress", (e) => {
//             if (e.key === "Enter") {
//                 textSpan.textContent = inputEdit.value;
//                 inputEdit.replaceWith(textSpan);
//                 saveTasks();
//             }
//         });
//     });

//     li.appendChild(updateBtn);

//     li.addEventListener("click", () => {
//         li.classList.toggle("completed");
//         saveTasks();
//     });

//     taskList.appendChild(li);
//     saveTasks();
//     input.value = "";
// });

// window.addEventListener("DOMContentLoaded", () => {
//     const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     savedTasks.forEach(task => {
//         input.value = task.text;
//         addBtn.click();

//         const lastTask = document.querySelector("#taskList li:last-child");

//         if (task.completed && lastTask) {
//             lastTask.classList.add("completed");
//         }
//     });

//     input.value = "";
// });

// function filterTasks() {
//     const tasks = Array.from(document.querySelectorAll("#taskList li"));

//     tasks.sort((a, b) => {
//         return a.classList.contains("completed") - b.classList.contains("completed");
//     });

//     taskList.innerHTML = "";
//     tasks.forEach(task => taskList.appendChild(task));

//     saveTasks();
// }

// sortBtn.addEventListener("click", filterTasks);