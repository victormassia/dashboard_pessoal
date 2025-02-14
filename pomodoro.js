let timeLeft = 25 * 60; // 25 minutos em segundos
let cycleCount = 0; // Contador de ciclos
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const cycleCountDisplay = document.getElementById('cycleCount');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
let timerInterval;
let isRunning = false; // Variável para verificar se o timer está em execução

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timerInterval);
    isRunning = false; // O timer não está mais em execução
    cycleCount++;
    cycleCountDisplay.textContent = `Ciclos Completos: ${cycleCount}`;
    alert("Tempo esgotado! Faça uma pausa.");
  }
}

function startTimer() {
  if (!isRunning) { // Verifica se o timer não está em execução
    timerInterval = setInterval(updateTimer, 1000);
    isRunning = true; // O timer agora está em execução
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false; // O timer não está mais em execução
}

// Reinicia o timer para 25 minutos
function resetTimer() {
  timeLeft = 25 * 60; // Reinicia para 25 minutos
  cycleCount = 0; // Reinicia o contador de ciclos
  cycleCountDisplay.textContent = `Ciclos Completos: ${cycleCount}`;
  updateTimer(); // Atualiza a exibição do timer
  pauseTimer(); // Garante que o timer esteja pausado ao reiniciar
}

// Adiciona eventos aos botões
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Atualiza o timer na primeira execução
updateTimer();