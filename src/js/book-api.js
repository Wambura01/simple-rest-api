const express = require("express");
const bodyParser = require("body-parser"); //to decode HTML body content
const cors = require("cors"); //to allow access to resources in the browser

const app = express(); //initialize express app
const PORT = 3000;

let books = []; //where books are kept

app.use(cors());

//configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); //default body type for forms
app.use(bodyParser.json()); //used when requesting a resource with JQuery/REST client

//method to add book
app.post("/book", (req, res) => {
  const book = req.body; //what is filled in the form

  console.log(book); //logging the book info
  books.push(book); //adding the book to the array

  res.send("Book is added to the database");
});

//method to retrieve/get the books
app.get("/books", (req, res) => {
  res.json(books);
});

//method to get book by isbn
app.get("/book/:isbn", (req, res) => {
  //reading isbn from browser
  const isbn = req.params.isbn;

  //searching for books using isbn
  for (book of books) {
    if (book.isbn === isbn) {
      res.json(book);
      return;
    }
  }

  //method to delete a book using their isbn
  app.delete("/book/:isbn", (req, res) => {
    //reading isbn from browser
    const isbn = req.params.isbn;

    //deleting the book using isbn
    books.filter((i) => {
      if (i.isbn !== isbn) {
        return true;
      }
      return false;
    });

    res.send("Book is Deleted");
  });

  //method to update book with the isbn as id
  app.post("/book/:isbn", (req, res) => {
    //getting isbn from the url
    const isbn = req.params.isbn;
    const newBook = req.body;

    //update item from the array of books
    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      if (book.isbn === isbn) {
        books[i] = newBook;
      }
    }

    res.send("Book is edited");
  });

  //return this when book is not found
  res.status(404).send("Book is not found!!");
});

//setting up the port
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}!`);
});
