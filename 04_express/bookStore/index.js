const express = require("express");
const app = express();
const PORT = 8000;

// In-memory data store for books
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1948,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
  },
];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Get all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// Get book by ID
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) return res.status(400).json({ error: "Invalid book ID" });

  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });

  res.status(200).json(book);
});

// Get books by author
app.get("/books/author/:authorName", (req, res) => {
  const authorName = req.params.authorName.toLowerCase();
  const filteredBooks = books.filter(
    (b) => b.author.toLowerCase() === authorName,
  );

  if (filteredBooks.length === 0)
    return res.status(404).json({ error: "No books found for this author" });
  res.status(200).json(filteredBooks);
});

// Add a new book
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title.trim() || !author.trim() || !year)
    return res.status(400).json({ error: "Missing required fields" });
  const newBook = {
    id: books.length + 1,
    title,
    author,
    year,
  };
  books.push(newBook);
  res.status(201).json({ message: "Book added successfully", book: newBook });
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) return res.status(400).json({ error: "Invalid book ID" });

  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

  books.splice(bookIndex, 1);
  res.status(200).json({ message: "Book deleted successfully" });
});