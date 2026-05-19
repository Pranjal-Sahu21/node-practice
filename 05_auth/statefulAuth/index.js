import express from "express";
import userRouter from "./routes/user.routes.js";
import "dotenv/config";
import db from "./db/index.js";
import { userSessions, usersTable } from "./db/schema.js";
import { eq } from "drizzle-orm";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;
app.use(express.json());

// Middleware to check for session and attach user details to the request object
app.use(authMiddleware);

app.use("/api/users", userRouter);

app.get("/", (_, res) => {
  res.send("Server is Live!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/users", userRouter);

app.get("/", (_, res) => {
  res.send("Server is Live!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
