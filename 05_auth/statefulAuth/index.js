import express from "express";
import userRouter from "./routes/user.routes.js";
import "dotenv/config";
import db from "./db/index.js";
import { userSessions, usersTable } from "./db/schema.js";
import { eq } from "drizzle-orm";

const app = express();
const PORT = process.env.PORT ?? 8000;
app.use(express.json());

// Middleware to check for session and attach user details to the request object
app.use(async (req, res, next) => {
  const sessionId = req.headers["session-id"];
  if (!sessionId) return next();

  const [data] = await db
    .select({
      sessionId: userSessions.id,
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(userSessions)
    .rightJoin(usersTable, eq(usersTable.id, userSessions.userId))
    .where((table) => eq(table.sessionId, sessionId));

  if (!data) return next();
  req.user = data;
  next();
});

app.use("/api/users", userRouter);

app.get("/", (_, res) => {
  res.send("Server is Live!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
