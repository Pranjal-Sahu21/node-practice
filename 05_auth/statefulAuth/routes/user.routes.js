import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { randomBytes, createHmac } from "node:crypto";
import { eq } from "drizzle-orm";

const router = express.Router();

// Returns current logged in user details
router.get("/", (req, res) => {});

// Signup a new user
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email and password are required!" });
  }

  // Check if user with the same email already exists
  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where((table) => eq(table.email, email))
    .limit(1);

  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User with this email already exists!" });
  }

  // Random salt generation and password hashing
  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  // Insert the new user into the database
  try {
    const [user] = await db
      .insert(usersTable)
      .values({ name, email, password: hashedPassword, salt })
      .returning({ id: usersTable.id });
    res.status(201).json({
      message: "User created successfully",
      data: { userId: user.id },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user!" });
  }
});

// Login an existing user
router.post("/login", async (req, res) => {});

export default router;
