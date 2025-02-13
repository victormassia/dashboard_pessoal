const exerciseInput = document.getElementById('exerciseInput');
const addExerciseButton = document.getElementById('addExercise');
const exerciseList = document.getElementById('exerciseList');

// Armazenar exercícios
let exercises = JSON.parse(localStorage.getItem('exercises')) || [];

// Função para adicionar um exercício
function addExercise() {
  const exerciseText = exerciseInput.value.trim();
  if (exerciseText) {
    exercises.push(exerciseText);
    saveExercises();
    loadExercises();
    exerciseInput.value = '';
  } else {
    alert("Por favor, insira um exercício.");
  }
}

// Função para carregar os exercícios
function loadExercises() {
  exerciseList.innerHTML = '';
  exercises.forEach((exercise, index) => {
    const li = document.createElement('li');
    li.textContent = exercise;

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = () => {
      const newExerciseText = prompt('Edite seu exercício:', exercise);
      if (newExerciseText) {
        exercises[index] = newExerciseText;
        saveExercises();
        loadExercises();
      }
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
      exercises.splice(index, 1);
      saveExercises();
      loadExercises();
    };

    li.appendChild(editButton);
    li.appendChild(removeButton);
    exerciseList.appendChild(li);
  });
}

// Função para salvar exercícios no localStorage
function saveExercises() {
  localStorage.setItem('exercises', JSON.stringify(exercises));
}

// Carregar exercícios do localStorage ao iniciar
window.onload = loadExercises;

// Adiciona evento ao botão
addExerciseButton.addEventListener('click', addExercise);