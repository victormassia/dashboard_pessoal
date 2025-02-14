const currentBookInput = document.getElementById('currentBookInput');
const progressInput = document.getElementById('progressInput');
const addCurrentBookButton = document.getElementById('addCurrentBook');
const currentBookList = document.getElementById('currentBookList');

const readBookInput = document.getElementById('readBookInput');
const addReadBookButton = document.getElementById('addReadBook');
const readBookList = document.getElementById('readBookList');

const plannedBookInput = document.getElementById('plannedBookInput');
const addPlannedBookButton = document.getElementById('addPlannedBook');
const plannedBookList = document.getElementById('plannedBookList');

const noteInput = document.getElementById('noteInput');
const saveNoteButton = document.getElementById('saveNote');

const reviewBookInput = document.getElementById('reviewBookInput');
const ratingInput = document.getElementById('ratingInput');
const reviewInput = document.getElementById('reviewInput');
const saveReviewButton = document.getElementById('saveReview');

// Armazenar livros, anotações e avaliações
let currentBooks = JSON.parse(localStorage.getItem('currentBooks')) || [];
let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];
let plannedBooks = JSON.parse(localStorage.getItem('plannedBooks')) || [];
let notes = JSON.parse(localStorage.getItem('notes')) || {};
let reviews = JSON.parse(localStorage.getItem('reviews')) || {};

// Função para adicionar um livro que está sendo lido
function addCurrentBook() {
  const bookText = currentBookInput.value.trim();
  const progress = progressInput.value.trim();
  if (bookText) {
    currentBooks.push({ title: bookText, progress: progress || 0 });
    saveBooks();
    loadCurrentBooks();
    currentBookInput.value = '';
    progressInput.value = '';
  } else {
    alert("Por favor, insira um livro.");
  }
}

// Função para adicionar um livro lido
function addReadBook() {
  const bookText = readBookInput.value.trim();
  if (bookText) {
    readBooks.push(bookText);
    saveBooks();
    loadReadBooks();
    readBookInput.value = '';
  } else {
    alert("Por favor, insira um livro lido.");
  }
}

// Função para adicionar um livro planejado
function addPlannedBook() {
  const bookText = plannedBookInput.value.trim();
  if (bookText) {
    plannedBooks.push(bookText);
    saveBooks();
    loadPlannedBooks();
    plannedBookInput.value = '';
  } else {
    alert("Por favor, insira um livro planejado.");
  }
}

// Função para carregar os livros que estão sendo lidos
function loadCurrentBooks() {
  currentBookList.innerHTML = '';
  currentBooks.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - Progresso: ${book.progress}%`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
      currentBooks.splice(index, 1);
      saveBooks();
      loadCurrentBooks();
    };

    li.appendChild(removeButton);
    currentBookList.appendChild(li);
  });
}

// Função para carregar os livros lidos
function loadReadBooks() {
  readBookList.innerHTML = '';
  readBooks.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = book;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
      readBooks.splice(index, 1);
      saveBooks();
      loadReadBooks();
    };

    li.appendChild(removeButton);
    readBookList.appendChild(li);
  });
}

// Função para carregar os livros planejados
function loadPlannedBooks() {
  plannedBookList.innerHTML = '';
  plannedBooks.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = book;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => {
      plannedBooks.splice(index, 1);
      saveBooks();
      loadPlannedBooks();
    };

    li.appendChild(removeButton);
    plannedBookList.appendChild(li);
  });
}

// Função para salvar livros, anotações e avaliações no localStorage
function saveBooks() {
  localStorage.setItem('currentBooks', JSON.stringify(currentBooks));
  localStorage.setItem('readBooks', JSON.stringify(readBooks));
  localStorage.setItem('plannedBooks', JSON.stringify(plannedBooks));
  localStorage.setItem('notes', JSON.stringify(notes));
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Função para carregar livros do localStorage ao iniciar
window.onload = () => {
  loadCurrentBooks();
  loadReadBooks();
  loadPlannedBooks();
};

// Adiciona eventos aos botões
addCurrentBookButton.addEventListener('click', addCurrentBook);
addReadBookButton.addEventListener('click', addReadBook);
addPlannedBookButton.addEventListener('click', addPlannedBook);

// Função para salvar anotações
saveNoteButton.addEventListener('click', () => {
  const bookTitle = prompt("Qual livro você está anotando?");
  if (bookTitle) {
    const noteText = noteInput.value.trim();
    if (noteText) {
      notes[bookTitle] = noteText; // Salva a anotação com o título do livro como chave
      localStorage.setItem('notes', JSON.stringify(notes));
      alert("Anotação salva!");
      noteInput.value = ''; // Limpa o campo de anotações
    } else {
      alert("Por favor, insira uma anotação.");
    }
  } else {
    alert("Por favor, insira o título do livro.");
  }
});

// Função para salvar avaliações e resenhas
saveReviewButton.addEventListener('click', () => {
  const bookTitle = reviewBookInput.value.trim();
  const rating = ratingInput.value.trim();
  const reviewText = reviewInput.value.trim();

  if (bookTitle && rating && reviewText) {
    if (rating < 1 || rating > 5) {
      alert("A nota deve ser entre 1 e 5.");
      return;
    }
    reviews[bookTitle] = { rating: rating, review: reviewText }; // Salva a avaliação e resenha
    localStorage.setItem('reviews', JSON.stringify(reviews));
    alert("Resenha salva!");
    reviewBookInput.value = ''; // Limpa o campo de título do livro
    ratingInput.value = ''; // Limpa o campo de nota
    reviewInput.value = ''; // Limpa o campo de resenha
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'Escuro' : 'Claro';
    toggleButton.innerHTML = `<i class="fas fa-adjust"></i> Mudar para ${currentTheme} Tema`;
});

// Definindo o tema padrão
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
}
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
} else {
    body.classList.add('light-mode');
}