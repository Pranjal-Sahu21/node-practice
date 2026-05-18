import express from "express";
import userRouter from "./routes/user.routes.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 8000;
app.use(express.json());
app.use("/api/users", userRouter);

app.get("/", (_, res) => {
  res.send("Server is Live!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});