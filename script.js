// Inicializa o Flatpickr
flatpickr("#datePicker", {
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr, instance) {
        loadTasks(dateStr);
        updateTodayTasks(); // Atualiza as tarefas do dia atual
    }
});

// Armazenar tarefas por data
const tasksByDate = {};

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const todayTaskList = document.getElementById('todayTaskList');
const datePicker = document.getElementById('datePicker');

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    const selectedDate = datePicker.value;

    if (taskText && selectedDate) {
        if (!tasksByDate[selectedDate]) {
            tasksByDate[selectedDate] = [];
        }

        tasksByDate[selectedDate].push(taskText);
        saveTasks();
        loadTasks(selectedDate);
        updateTodayTasks(); // Atualiza as tarefas do dia atual
        taskInput.value = '';
    } else {
        alert("Por favor, insira uma tarefa e selecione uma data.");
    }
}

// Função para carregar tarefas de uma data específica
function loadTasks(date) {
    taskList.innerHTML = '';
    const tasks = tasksByDate[date] || [];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Concluir';
        completeButton.onclick = () => {
            li.classList.toggle('completed');
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => {
            const newTaskText = prompt('Edite sua tarefa:', task);
            if (newTaskText) {
                tasks[index] = newTaskText;
                saveTasks();
                loadTasks(date);
                updateTodayTasks(); // Atualiza as tarefas do dia atual
            }
        };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            loadTasks(date);
            updateTodayTasks(); // Atualiza as tarefas do dia atual
        };

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

// Função para atualizar as tarefas do dia atual
function updateTodayTasks() {
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    todayTaskList.innerHTML = ''; // Limpa a lista de tarefas do dia

    const tasks = tasksByDate[today] || [];
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        li.dataset.index = index; // Armazena o índice da tarefa

        todayTaskList.appendChild(li);
    });

    // Inicializa o Sortable
    new Sortable(todayTaskList, {
        animation: 150,
        onEnd: function (evt) {
            const movedTask = tasks.splice(evt.oldIndex, 1)[0]; // Remove a tarefa da posição antiga
            tasks.splice(evt.newIndex, 0, movedTask); // Adiciona a tarefa na nova posição
            tasksByDate[today] = tasks; // Atualiza a lista de tarefas do dia atual
            saveTasks(); // Salva as tarefas
            updateTodayTasks(); // Atualiza a lista de tarefas do dia atual
        }
    });
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasksByDate', JSON.stringify(tasksByDate));
}

// Carregar tarefas do localStorage ao iniciar
window.onload = () => {
    const savedTasks = localStorage.getItem('tasksByDate');
    if (savedTasks) {
        Object.assign(tasksByDate, JSON.parse(savedTasks));
    }
    updateTodayTasks(); // Atualiza as tarefas do dia atual ao carregar
};

// Adiciona a tarefa ao clicar no botão
addTaskButton.addEventListener('click', addTask);

// Notas Rápidas (salvas automaticamente)
const notes = document.getElementById('notes');
notes.value = localStorage.getItem('notes') || '';
notes.addEventListener('input', () => {
    localStorage.setItem('notes', notes.value);
});

// Lógica do Modo Escuro
const toggleDarkModeButton = document.getElementById('toggleDarkMode');

toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode'); // Adiciona ou remove a classe light-mode
    
    // Atualiza o ícone do botão com base no modo atual
    if (document.body.classList.contains('dark-mode')) {
        toggleDarkModeButton.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone do sol
    } else {
        toggleDarkModeButton.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone da lua
    }
});

// Lógica do Pomodoro
const startPomodoroButton = document.getElementById('startPomodoro');

startPomodoroButton.addEventListener('click', () => {
    window.location.href = 'pomodoro.html'; // Redireciona para a página do Pomodoro
});

// Lógica para redirecionar para a página de Metas de 2025
const goToGoalsButton = document.getElementById('goToGoals');

goToGoalsButton.addEventListener('click', () => {
    window.location.href = 'goals.html'; // Redireciona para a página de metas
});

// Lógica para redirecionar para a página de Assuntos de Estudo
const goToStudyButton = document.getElementById('goToStudy');

goToStudyButton.addEventListener('click', () => {
    window.location.href = 'study.html'; // Redireciona para a página de estudos
});

// Lógica para preencher as garrafas de água
let filledBottles = 0; // Contador de garrafas preenchidas

function fillBottle(index) {
    const bottles = document.querySelectorAll('.bottle');
    
    if (filledBottles < 5) {
        bottles[index].classList.add('filled'); // Adiciona a classe 'filled' à garrafa clicada
        filledBottles++; // Incrementa o contador de garrafas preenchidas
    } else {
        alert("Você já preencheu todas as garrafas de água!");
    }
}

// Lógica para redirecionar para a página de Livros
const goToBooksButton = document.getElementById('goToBooks');

goToBooksButton.addEventListener('click', () => {
    window.location.href = 'books.html'; // Redireciona para a página de livros
});

// Lógica para redirecionar para a página de Largar Hábitos Ruins
const goToHabitsButton = document.getElementById('goToHabits');

goToHabitsButton.addEventListener('click', () => {
    window.location.href = 'habits.html'; // Redireciona para a página de hábitos
});

// Lógica para redirecionar para a página de Atividade Física
const goToExerciseButton = document.getElementById('goToExercise');

goToExerciseButton.addEventListener('click', () => {
    window.location.href = 'exercise.html'; // Redireciona para a página de exercícios
});