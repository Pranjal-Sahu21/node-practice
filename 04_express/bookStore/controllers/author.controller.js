const { authorsTable } = require("../models/index");
const { db } = require("../db");
const { eq } = require("drizzle-orm");

// Get all authors
exports.getAllAuthors = async (req, res) => {
  const authors = await db.select().from(authorsTable);
  return res.json(authors).status(200);
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
  const authorId = req.params.id;
  if (!authorId) return res.status(400).json({ error: "Invalid author ID" });

  const [author] = await db
    .select()
    .from(authorsTable)
    .where((table) => eq(table.id, authorId))
    .limit(1);
  if (!author) return res.status(404).json({ error: "Author not found" });

  res.json(author).status(200);
};

// Add a new author
exports.addAuthor = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res
      .status(400)
      .json({ error: "First name, last name, and email are required" });
  }
  const [newAuthor] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning({ id: authorsTable.id });
  res.json({ message: "Author added successfully", id: newAuthor.id }).status(201);
};

// Delete an author by ID
exports.deleteAuthorById = async (req, res) => {
  const authorId = req.params.id;
  if (!authorId) return res.status(400).json({ error: "Invalid author ID" });
  
  const [author] = await db
    .select()
    .from(authorsTable)
    .where((table) => eq(table.id, authorId))
    .limit(1);
  if (!author) return res.status(404).json({ error: "Author not found" });
  
  await db.delete(authorsTable).where((table) => eq(table.id, authorId));

  res.json({ message: "Author deleted successfully" }).status(200);
};
