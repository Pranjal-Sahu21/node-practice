const express = require("express");
const { books } = require("./data/books");
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) return res.status(400).json({ error: "Invalid book ID" });

  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });

  res.json(book);
});
