class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    //create tr element
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td> <a href="" class= "delete"> x<a></td>
  `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");

    div.className = `alert ${className}`;

    //add text
    div.appendChild(document.createTextNode(message));

    //get parent
    const container = document.querySelector(".container");

    //get form
    const form = document.querySelector("#book-form");

    // Inser alert
    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearField() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
};

//local storage class
class Store{
 static getBooks(){
  let books;
  if(localStorage.getItem('books') === null){
    books =[];
  }else{
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
  }
  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;

      ui.addBookToList(book);
    })
  };
  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  };
  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById("book-form").addEventListener("submit", function (e) {
  //get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill out all fields", "error");
  } else {
    //add book to list
    ui.addBookToList(book);
    
    //add to locsl storage
    Store.addBook(book);

    //show success
    ui.showAlert("book Added!", "success");
    // clears fields
    ui.clearFields();
  }

  e.preventDefault();
});

//add event listner to romove items

document.getElementById("book-list").addEventListener("click", function (e) {
  //instantiate UI

  const ui = new UI();

  ui.deleteBook(e.target);

  //remove from local storage

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert("book deleted", "success");

  e.preventDefault();
});
