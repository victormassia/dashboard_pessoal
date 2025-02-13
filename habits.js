const habitInput = document.getElementById('habitInput');
const addHabitButton = document.getElementById('addHabit');
const habitList = document.getElementById('habitList');

const goalInput = document.getElementById('goalInput');
const addGoalButton = document.getElementById('addGoal');
const goalList = document.getElementById('goalList');

// Armazenar hábitos e metas
let habits = JSON.parse(localStorage.getItem('habits')) || [];
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// Função para adicionar um hábito
function addHabit() {
  const habitText = habitInput.value.trim();
  if (habitText) {
    habits.push(habitText);
    saveHabits();
    loadHabits();
    habitInput.value = '';
  } else {
    alert("Por favor, insira um hábito.");
  }
}

// Função para adicionar uma meta
function addGoal() {
  const goalText = goalInput.value.trim();
  if (goalText) {
    goals.push(goalText);
    saveGoals();
    loadGoals();
    goalInput.value = '';
  } else {
    alert("Por favor, insira uma meta.");
  }
}

// Função para carregar os hábitos
function loadHabits() {
  habitList.innerHTML = '';
  habits.forEach((habit, index) => {
    const li = document.createElement('li');
    li.textContent = habit;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
      habits.splice(index, 1);
      saveHabits();
      loadHabits();
    };

    li.appendChild(removeButton);
    habitList.appendChild(li);
  });
}

// Função para carregar as metas
function loadGoals() {
  goalList.innerHTML = '';
  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.textContent = goal;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
      goals.splice(index, 1);
      saveGoals();
      loadGoals();
    };

    li.appendChild(removeButton);
    goalList.appendChild(li);
  });
}

// Função para salvar hábitos e metas no localStorage
function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

// Carregar hábitos e metas do localStorage ao iniciar
window.onload = () => {
  loadHabits();
  loadGoals();
};

// Adiciona eventos aos botões
addHabitButton.addEventListener('click', addHabit);
addGoalButton.addEventListener('click', addGoal);