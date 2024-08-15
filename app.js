// book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;

}

//UI constructor
function UI(){}

//add boo to list
UI.prototype.addBookToList = function(book){
const list = document.getElementById('book-list');

//create tr element
const row = document.createElement('tr');

row.innerHTML =`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a href="" class= "delete"> x<a></td>
`;

list.appendChild(row)
}
//show alerts
UI.prototype.showAlert = function(message, className){
  //create a div
  const div = document.createElement('div');

  div.className = `alert ${className}`;

  //add text
  div.appendChild(document.createTextNode(message));  

  //get parent 
  const container = document.querySelector('.container');

  //get form
  const form = document.querySelector('#book-form');

  // Inser alert
  container.insertBefore(div, form);

  setTimeout(function(){
    document.querySelector('.alert').remove();}, 3000);
  
};

//delete fields

UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  };
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

function Store(){

}

function getbook(){
  let books;
  if(localStorage.getItem('books') === null){
    books =[];
  }else{
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}
Store.prototype.getBook = function(){
 let books;
  if(localStorage.getItem('books') === null){
    books =[];
  }else{
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
};

Store.prototype.displayBook = function(){
  const books = getbook();

  books.forEach(function(book){
    const ui = new UI;

    ui.addBookToList(book);
  });
};

Store.prototype.addBook = function(book){
  const books = getbook();

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
};

Store.prototype.removeBook = function(isbn){
  const books = getbook();

  books.forEach(function(book, index){
    if(book.isbn === isbn){
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
};

const store = new Store();
// DOM Load Event
document.addEventListener('DOMContentLoaded', store.displayBook);

document.getElementById('book-form').addEventListener("submit", function(e){

  //get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI

  const ui = new UI();

  //instantiate Store

  const store = new Store();

  if(title === '' || author ==='' || isbn ===''){
    ui.showAlert('Please fill out all fields', 'error')
  }else{
    //add book to list
    ui.addBookToList(book);
     //add to locsl storage
     store.addBook(book);


    //show success
    ui.showAlert('book Added!', 'success');
    // clears fields
    ui.clearFields();
   
  }


  
e.preventDefault();
});

//add event listner to romove items

document.getElementById('book-list').addEventListener('click', function(e){

  //instantiate UI

  const ui = new UI();

  const store = new Store();

  ui.deleteBook(e.target);

  store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('book deleted', 'success');

  e.preventDefault();
});