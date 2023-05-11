// Import required modules
const express = require("express");
const bodyParser = require('body-parser');

// Create an instance of the Express application
const app = express();

const port = 3000;

// Use the body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Define an array to store the books
let books = [];

// Define a route to get the list of books
app.get("/books", (req, res) => {
  res.json(books);
});

// Define a route to add a book
app.post("/books", (req, res) => {
  // Get the book data from the request body
  const { title, author, publishedDate } = req.body;

// Validate the required fields
if (!title || !author || !publishedDate) {
  res.status(400).json({ message: 'Title, author, and publishedDate are required' });
  return;
}
// Generate a unique ID for the book
const id = Date.now().toString();

// Create a new book object with the provided data
const newBook = { id, title, author, publishedDate };




// Add the new book to the array of books
books.push(newBook);

// Send the new book as the response
res.json(newBook);

});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex >= 0) {
    books.splice(bookIndex, 1);
    res.json({ message: `Book with ID ${id} successfully deleted.` });
  } else {
    res.status(404).json({ message: `Book with ID ${id} not found.` });
  }
});

app.use((req, res) => {
  res.sendFile(__dirname + "/error.html");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

// Add some sample data
books.push(
  {
    id: '001',
    title: 'Amar Ami',
    author: 'Iqbal Shah',
    publishedDate: '2022-05-07'
  },
  {
    id: '002',
    title: 'Chader Hasi',
    author: 'Mehboob Khan',
    publishedDate: '2023-01-15'
  },
  
);