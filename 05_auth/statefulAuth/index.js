import express from "express";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js"
import "dotenv/config";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;
app.use(express.json());
app.use(authMiddleware);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

app.get("/", (_, res) => {
  res.send("Server is Live!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});