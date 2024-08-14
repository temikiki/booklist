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


UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}




document.getElementById('book-form').addEventListener("submit", function(e){

  //get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI

  const ui = new UI();

  if(title === '' || author ==='' || isbn ===''){
    ui.showAlert('Please fill out all fields', 'error')
  }else{
    //add book to list
    ui.addBookToList(book);

    //show success
    ui.showAlert('book Added!', 'success');
    // clears fields
    ui.clearFields();
   
  }


  
e.preventDefault();
});