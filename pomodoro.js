let timeLeft = 25 * 60; // 25 minutos em segundos
const timerDisplay = document.getElementById('timer');

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timerInterval);
    alert("Tempo esgotado! Faça uma pausa.");
  }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();