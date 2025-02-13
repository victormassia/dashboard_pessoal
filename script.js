// Inicializa o Flatpickr
flatpickr("#datePicker", {
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr, instance) {
      loadTasks(dateStr);
    }
  });
  
  // Armazenar tarefas por data
  const tasksByDate = {};
  
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const datePicker = document.getElementById('datePicker');
  
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
      taskInput.value = '';
    } else {
      alert("Por favor, insira uma tarefa e selecione uma data.");
    }
  }
  
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
        }
      };
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.onclick = () => {
        tasks.splice(index, 1);
        saveTasks();
        loadTasks(date);
      };
  
      li.appendChild(completeButton);
      li.appendChild(editButton);
      li.appendChild(removeButton);
      taskList.appendChild(li);
    });
  }
  
  function saveTasks() {
    localStorage.setItem('tasksByDate', JSON.stringify(tasksByDate));
  }
  
  // Carregar tarefas do localStorage ao iniciar
  window.onload = () => {
    const savedTasks = localStorage.getItem('tasksByDate');
    if (savedTasks) {
      Object.assign(tasksByDate, JSON.parse(savedTasks));
    }
  };
  addTaskButton.addEventListener('click', addTask);
  
  // Notas Rápidas (salvas automaticamente)
  const notes = document.getElementById('notes');
  notes.value = localStorage.getItem('notes') || '';
  notes.addEventListener('input', () => {
    localStorage.setItem('notes', notes.value);
  });