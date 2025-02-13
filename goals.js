const goalInput = document.getElementById('goalInput');
const addGoalButton = document.getElementById('addGoal');
const goalList = document.getElementById('goalList');

// Armazenar metas
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// Função para adicionar uma nova meta
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

// Função para carregar as metas
function loadGoals() {
  goalList.innerHTML = '';
  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.textContent = goal;

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = () => {
      const newGoalText = prompt('Edite sua meta:', goal);
      if (newGoalText) {
        goals[index] = newGoalText;
        saveGoals();
        loadGoals();
      }
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
      goals.splice(index, 1);
      saveGoals();
      loadGoals();
    };

    li.appendChild(editButton);
    li.appendChild(removeButton);
    goalList.appendChild(li);
  });
}

// Função para salvar as metas no localStorage
function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

// Carregar metas do localStorage ao iniciar
window.onload = loadGoals;

addGoalButton.addEventListener('click', addGoal);