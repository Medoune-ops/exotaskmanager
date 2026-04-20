const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const supabaseUrl = 'https://oorrxmaqrzqnfqoeanol.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcnJ4bWFxcnpxbmZxb2Vhbm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTU3NTEsImV4cCI6MjA5MTgzMTc1MX0.PniLnUVr2O4I2SqUh0JO3gLHb7OLrD4Xp1lNB3hONlg';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;


async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await _supabase.auth.signUp({ email, password });
    if (error) alert("Erreur: " + error.message);
    else alert("Inscription réussie ! Vérifie tes mails.");
}

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

    if (error) alert("Erreur: " + error.message);
    else checkUser(); 
}

async function signOut() {
    await _supabase.auth.signOut();
    checkUser();
}

async function checkUser() {
    const { data: { user } } = await _supabase.auth.getUser();
    const authInterface = document.getElementById('auth-interface');
    const appInterface = document.getElementById('app-interface');

    if (user) {
        authInterface.classList.add('hidden');
        appInterface.classList.remove('hidden');
        loadTasks();
    } else {
        authInterface.classList.remove('hidden');
        appInterface.classList.add('hidden');
        taskList.innerHTML = "";
    }
}


function createTaskRow(text, isCompleted = false, id = null) {
    const row = document.createElement('tr');
    row.className = "border-b border-gray-100 hover:bg-gray-50 transition";
    
    // Style du badge et du texte
    const badgeText = isCompleted ? "✓ Complétée" : "En cours";
    const badgeColor = isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
    const textDecoration = isCompleted ? "line-through text-gray-400" : "text-gray-800";

    row.innerHTML = `
        <td class="p-4 task-text">
            <span class="${textDecoration}">${text}</span>
        </td>
        <td class="p-4 text-center">
            <span class="status-badge px-3 py-1 text-xs font-medium ${badgeColor} rounded-full cursor-pointer select-none">
                ${badgeText}
            </span>
        </td>
        <td class="p-4 text-right flex justify-end gap-2">
            <button class="edit-btn text-blue-500 hover:text-blue-700 font-medium transition cursor-pointer">Modifier</button>
            <button class="delete-btn text-red-500 hover:text-red-700 font-medium transition cursor-pointer px-4">Supprimer</button>
        </td>`;

    row.querySelector('.status-badge').addEventListener('click', async () => {
        const { error } = await _supabase
            .from('test_table')
            .update({ is_completed: !isCompleted }) 
            .eq('id', id);

        if (!error) loadTasks(); 
    });

    row.querySelector('.edit-btn').addEventListener('click', async () => {
        const nouveauNom = prompt("Modifier la tâche :", text);
        if (nouveauNom && nouveauNom.trim() !== "" && nouveauNom !== text) {
            const { error } = await _supabase
                .from('test_table')
                .update({ name: nouveauNom })
                .eq('id', id);
            
            if (!error) loadTasks();
        }
    });

    row.querySelector('.delete-btn').addEventListener('click', async () => {
        const { error } = await _supabase
            .from('test_table')
            .delete()
            .eq('id', id);
        
        if (!error) row.remove();
    });

    taskList.appendChild(row);
}

async function loadTasks(filter = 'all') {
    let query = _supabase
        .from('test_table')
        .select('*')
        .order('created_at', { ascending: false });

    if (filter === 'completed') query = query.eq('is_completed', true);
    if (filter === 'todo') query = query.eq('is_completed', false);

    const { data, error } = await query;

    if (!error) {
        taskList.innerHTML = ""; 
        data.forEach(task => {
            createTaskRow(task.name, task.is_completed, task.id);
        });
    }
}

addBtn.addEventListener('click', async () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const { error } = await _supabase
            .from('test_table')
            .insert([{ name: taskText }]); 

        if (error) alert("Erreur : " + error.message);
        else {
            loadTasks();
            taskInput.value = "";
        }
    }
});

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const filterType = e.currentTarget.getAttribute('data-filter');
        loadTasks(filterType);

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('bg-gray-300', 'font-bold'));
        e.currentTarget.classList.add('bg-gray-300', 'font-bold');
    });
});

checkUser();