// HTTP methods: GET, POST, PUT, DELETE
// REST API is a type of API that follows a specific architectural style, using HTTP methods like GET, POST, PUT, and DELETE to perform actions.
// Not all APIs are REST APIs.

import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

let books = [
  {
    id: 1,
    title: "JavaScript",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Python",
    author: "Jane Doe",
  },
];

// GET method
app.get("/books", (req, res) => {
  res.send(books);
});

// POST method
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.json({ message: "Book added successfully!", data: newBook });
});

// PUT method (update)
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found!" });
  }
  book.title = req.body.title;
  book.author = req.body.author;
  return res.json({ message: "Book updated successfully!", data: book });
});

// DELETE method
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((b) => b.id !== bookId);
  res.json({ message: "Book deleted successfully!" });
});
