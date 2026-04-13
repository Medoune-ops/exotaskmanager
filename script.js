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