document.addEventListener('DOMContentLoaded', () => {
    // Habits
    const habitInput = document.getElementById('new-habit');
    const addHabitButton = document.getElementById('add-habit');
    const habitsList = document.getElementById('habits-list');
  
    if (addHabitButton) {
      addHabitButton.addEventListener('click', () => {
        const habit = habitInput.value.trim();
        if (habit) {
          const li = document.createElement('li');
          li.textContent = habit;
          habitsList.appendChild(li);
          habitInput.value = '';
        }
      });
    }
  
    // Water Intake
    let waterTotal = 0;
    const waterInput = document.getElementById('water-amount');
    const addWaterButton = document.getElementById('add-water');
    const waterTotalDisplay = document.getElementById('water-total');
  
    if (addWaterButton) {
      addWaterButton.addEventListener('click', () => {
        const amount = parseInt(waterInput.value.trim(), 10);
        if (!isNaN(amount) && amount > 0) {
          waterTotal += amount;
          waterTotalDisplay.textContent = `Total de água: ${waterTotal} ml`;
          waterInput.value = '';
        }
      });
    }
  
    // Tasks
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const tasksList = document.getElementById('tasks-list');
  
    if (addTaskButton) {
      addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
          const li = document.createElement('li');
          li.textContent = task;
          li.addEventListener('click', () => {
            li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
          });
          tasksList.appendChild(li);
          taskInput.value = '';
        }
      });
    }
  
    // Agenda
    const agendaDateInput = document.getElementById('agenda-date');
    const agendaNotesInput = document.getElementById('agenda-notes');
    const saveNotesButton = document.getElementById('save-notes');
    const agendaDisplay = document.getElementById('agenda-display');
  
    if (saveNotesButton) {
      saveNotesButton.addEventListener('click', () => {
        const date = agendaDateInput.value;
        const notes = agendaNotesInput.value.trim();
        if (date && notes) {
          const div = document.createElement('div');
          div.innerHTML = `<strong>${date}</strong><p>${notes}</p>`;
          agendaDisplay.appendChild(div);
          agendaNotesInput.value = '';
        }
      });
    }
  
    // Pomodoro Timer
    let pomodoroTimer;
    let pomodoroTime = 1500; // 25 minutes in seconds
    const pomodoroDisplay = document.getElementById('pomodoro-timer');
    const startPomodoroButton = document.getElementById('start-pomodoro');
    const resetPomodoroButton = document.getElementById('reset-pomodoro');
  
    const updatePomodoroDisplay = () => {
      const minutes = Math.floor(pomodoroTime / 60);
      const seconds = pomodoroTime % 60;
      pomodoroDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
  
    if (startPomodoroButton) {
      startPomodoroButton.addEventListener('click', () => {
        if (!pomodoroTimer) {
          pomodoroTimer = setInterval(() => {
            if (pomodoroTime > 0) {
              pomodoroTime -= 1;
              updatePomodoroDisplay();
            } else {
              clearInterval(pomodoroTimer);
              pomodoroTimer = null;
            }
          }, 1000);
        }
      });
    }
  
    if (resetPomodoroButton) {
      resetPomodoroButton.addEventListener('click', () => {
        clearInterval(pomodoroTimer);
        pomodoroTimer = null;
        pomodoroTime = 1500;
        updatePomodoroDisplay();
      });
    }
  
    if (pomodoroDisplay) {
      updatePomodoroDisplay();
    }
  
    // Reading
    const bookTitleInput = document.getElementById('book-title');
    const totalPagesInput = document.getElementById('total-pages');
    const currentPageInput = document.getElementById('current-page');
    const updateReadingButton = document.getElementById('update-reading');
    const readingProgressDisplay = document.getElementById('reading-progress');
    const bookReviewInput = document.getElementById('book-review');
    const saveReviewButton = document.getElementById('save-review');
    const reviewDisplay = document.getElementById('review-display');
  
    if (updateReadingButton) {
      updateReadingButton.addEventListener('click', () => {
        const totalPages = parseInt(totalPagesInput.value.trim(), 10);
        const currentPage = parseInt(currentPageInput.value.trim(), 10);
        if (!isNaN(totalPages) && totalPages > 0 && !isNaN(currentPage) && currentPage >= 0 && currentPage <= totalPages) {
          const progress = ((currentPage / totalPages) * 100).toFixed(2);
          readingProgressDisplay.textContent = `Progresso: ${progress}%`;
        }
      });
    }
  
    if (saveReviewButton) {
      saveReviewButton.addEventListener('click', () => {
        const title = bookTitleInput.value.trim();
        const review = bookReviewInput.value.trim();
        if (title && review) {
          const div = document.createElement('div');
          div.innerHTML = `<strong>${title}</strong><p>${review}</p>`;
          reviewDisplay.appendChild(div);
          bookTitleInput.value = '';
          totalPagesInput.value = '';
          currentPageInput.value = '';
          bookReviewInput.value = '';
          readingProgressDisplay.textContent = 'Progresso: 0%';
        }
      });
    }
  
    // Mind Map
    const mindMapNotesInput = document.getElementById('mind-map-notes');
    const saveMindMapButton = document.getElementById('save-mind-map');
    const mindMapDisplay = document.getElementById('mind-map-display');
  
    if (saveMindMapButton) {
      saveMindMapButton.addEventListener('click', () => {
        const notes = mindMapNotesInput.value.trim();
        if (notes) {
          const div = document.createElement('div');
          div.innerHTML = `<p>${notes}</p>`;
          mindMapDisplay.appendChild(div);
          mindMapNotesInput.value = '';
        }
      });
    }
  
    // Skill Tracking
    const skillNameInput = document.getElementById('skill-name');
    const skillNotesInput = document.getElementById('skill-notes');
    const addSkillButton = document.getElementById('add-skill');
    const skillsList = document.getElementById('skills-list');
  
    if (addSkillButton) {
      addSkillButton.addEventListener('click', () => {
        const skill = skillNameInput.value.trim();
        const notes = skillNotesInput.value.trim();
        if (skill && notes) {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${skill}</strong><p>${notes}</p>`;
          skillsList.appendChild(li);
          skillNameInput.value = '';
          skillNotesInput.value = '';
        }
      });
    }
  
    // Major Purchases
    const purchaseItemInput = document.getElementById('purchase-item');
    const purchaseNotesInput = document.getElementById('purchase-notes');
    const purchaseGoalInput = document.getElementById('purchase-goal');
    const savedAmountInput = document.getElementById('saved-amount');
    const addPurchaseButton = document.getElementById('add-purchase');
    const purchasesList = document.getElementById('purchases-list');
  
    if (addPurchaseButton) {
      addPurchaseButton.addEventListener('click', () => {
        const item = purchaseItemInput.value.trim();
        const notes = purchaseNotesInput.value.trim();
        const goal = parseFloat(purchaseGoalInput.value.trim());
        const saved = parseFloat(savedAmountInput.value.trim());
  
        if (item && notes && !isNaN(goal) && goal > 0 && !isNaN(saved) && saved >= 0) {
          const progress = ((saved / goal) * 100).toFixed(2);
          const li = document.createElement('li');
          li.innerHTML = `<strong>${item}</strong><p>${notes}</p><p>Objetivo: R$${goal.toFixed(2)}</p><p>Guardado: R$${saved.toFixed(2)}</p><p>Progresso: ${progress}%</p>`;
          purchasesList.appendChild(li);
          purchaseItemInput.value = '';
          purchaseNotesInput.value = '';
          purchaseGoalInput.value = '';
          savedAmountInput.value = '';
        }
      });
    }
  
    // Shopping List
    const shoppingItemInput = document.getElementById('shopping-item');
    const addShoppingItemButton = document.getElementById('add-shopping-item');
    const shoppingList = document.getElementById('shopping-list');
  
    if (addShoppingItemButton) {
      addShoppingItemButton.addEventListener('click', () => {
        const item = shoppingItemInput.value.trim();
        if (item) {
          const li = document.createElement('li');
          li.textContent = item;
          shoppingList.appendChild(li);
          shoppingItemInput.value = '';
        }
      });
    }
  });