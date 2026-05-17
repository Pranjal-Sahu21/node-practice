const express = require('express');
const { getAllAuthors, getAuthorById, addAuthor, deleteAuthorById } = require('../controllers/author.controller');

const router = express.Router();

// Get all authors
router.get('/', getAllAuthors);

// Get author by ID
router.get("/:id", getAuthorById);

// Add a new author
router.post("/", addAuthor);

// Delete an author by ID
router.delete("/:id", deleteAuthorById);

module.exports = router;