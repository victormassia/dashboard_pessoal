const currentBookInput = document.getElementById('currentBookInput');
const addCurrentBookButton = document.getElementById('addCurrentBook');
const currentBookList = document.getElementById('currentBookList');

const readBookInput = document.getElementById('readBookInput');
const addReadBookButton = document.getElementById('addReadBook');
const readBookList = document.getElementById('readBookList');

const noteInput = document.getElementById('noteInput');
const saveNoteButton = document.getElementById('saveNote');

// Armazenar livros e anotações
let currentBooks = JSON.parse(localStorage.getItem('currentBooks')) || [];
let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];
let notes = JSON.parse(localStorage.getItem('notes')) || {};

// Função para adicionar um livro que está sendo lido
function addCurrentBook() {
  const bookText = currentBookInput.value.trim();
  if (bookText) {
    currentBooks.push(bookText);
    saveBooks();
    loadCurrentBooks();
    currentBookInput.value = '';
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

// Função para carregar os livros que estão sendo lidos
function loadCurrentBooks() {
  currentBookList.innerHTML = '';
  currentBooks.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = book;

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

// Função para salvar livros e anotações no localStorage
function saveBooks() {
  localStorage.setItem('currentBooks', JSON.stringify(currentBooks));
  localStorage.setItem('readBooks', JSON.stringify(readBooks));
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Função para carregar livros do localStorage ao iniciar
window.onload = () => {
  loadCurrentBooks();
  loadReadBooks();
};

// Adiciona eventos aos botões
addCurrentBookButton.addEventListener('click', addCurrentBook);
addReadBookButton.addEventListener('click', addReadBook);

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