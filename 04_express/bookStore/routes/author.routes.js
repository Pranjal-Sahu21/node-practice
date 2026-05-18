const express = require('express');
const { getAllAuthors, getAuthorById, addAuthor, deleteAuthorById, getBooksByAuthorId } = require('../controllers/author.controller');

const router = express.Router();

// Get all authors
router.get('/', getAllAuthors);

// Get author by ID
router.get("/:id", getAuthorById);

// Add a new author
router.post("/", addAuthor);

// Get all books by an author
router.get("/:id/books", getBooksByAuthorId);

// Delete an author by ID
router.delete("/:id", deleteAuthorById);

module.exports = router;