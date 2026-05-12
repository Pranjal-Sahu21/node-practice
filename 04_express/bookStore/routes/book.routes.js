const express = require('express');
const { getAllBooks, getBookById, getBooksByAuthor, addBook, deleteBookById } = require('../controllers/book.controller');
const router = express.Router();

// Get all books
router.get('/', getAllBooks);

// Get book by ID
router.get("/:id", getBookById);

// Get books by author
router.get("/author/:authorName", getBooksByAuthor);

// Add a new book
router.post("", addBook);

// Delete a book by ID
router.delete("/:id", deleteBookById);

module.exports = router;