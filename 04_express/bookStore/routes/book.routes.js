const express = require('express');
const { getAllBooks, getBookById, addBook, deleteBookById } = require('../controllers/book.controller');
const router = express.Router();

// Get all books
router.get('/', getAllBooks);

// Get book by ID
router.get("/:id", getBookById);

// Add a new book
router.post("/", addBook);

// Delete a book by ID
router.delete("/:id", deleteBookById);

module.exports = router;