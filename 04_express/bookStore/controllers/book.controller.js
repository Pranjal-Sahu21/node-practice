const { books } = require("../data/books");

// Get all books
exports.getAllBooks = (req, res) => {
  res.json(books);
};

// Get book by ID
exports.getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) return res.status(400).json({ error: "Invalid book ID" });

  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });

  res.json(book);
};

// Get books by author
exports.getBooksByAuthor = (req, res) => {
  const authorName = req.params.authorName.toLowerCase();
  const filteredBooks = books.filter(b => b.author.toLowerCase() === authorName);   
    if (filteredBooks.length === 0) return res.status(404).json({ error: "No books found for this author" });
    res.json(filteredBooks);
};

// Add a new book
exports.addBook = (req, res) => {       
    const { title, author, year } = req.body;
    if (!title.trim() || !author.trim() || !year) return res.status(400).json({ error: "Missing required fields" });
    const newBook = {
        id: books.length + 1,
        title,
        author,
        year
    };
    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
};

// Delete a book by ID
exports.deleteBookById = (req, res) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) return res.status(400).json({ error: "Invalid book ID" });
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
};

