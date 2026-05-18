const { booksTable } = require("../models/index");
const { authorsTable } = require("../models/index");
const { db } = require("../db");
const { eq, sql } = require("drizzle-orm");

// Get all books
exports.getAllBooks = async (req, res) => {
  const search = req.query.search;

  if (search) {
    await db
      .select()
      .from(booksTable)
      .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`)
      .then((books) => {
        return res.json(books).status(200);
      })
      .catch((error) => {
        console.error("Error searching books:", error);
        return res
          .status(500)
          .json({ error: "An error occurred while searching for books" });
      });
  }

  const books = await db.select().from(booksTable);
  return res.json(books).status(200);
};

// Get book by ID
exports.getBookById = async (req, res) => {
  const bookId = req.params.id;
  if (!bookId) return res.status(400).json({ error: "Invalid book ID" });

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, bookId))
    .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
    .limit(1);
  if (!book) return res.status(404).json({ error: "Book not found" });

  res.json(book).status(200);
};

// Add a new book
exports.addBook = async (req, res) => {
  const { title, description, authorId } = req.body;
  if (!title || !description || !authorId) {
    return res
      .status(400)
      .json({ error: "Title, description, and authorId are required" });
  }
  const [newBook] = await db
    .insert(booksTable)
    .values({ title, description, authorId })
    .returning({ id: booksTable.id });
  res.json({ message: "Book added successfully", id: newBook.id }).status(201);
};

// Delete a book by ID
exports.deleteBookById = async (req, res) => {
  const bookId = req.params.id;
  if (!bookId) return res.status(400).json({ error: "Invalid book ID" });

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, bookId))
    .limit(1);
  if (!book) return res.status(404).json({ error: "Book not found" });

  await db.delete(booksTable).where((table) => eq(table.id, bookId));

  res.json({ message: "Book deleted successfully" }).status(200);
};
