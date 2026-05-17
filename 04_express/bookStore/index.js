require("dotenv/config");
const express = require("express");
const app = express();
const PORT = 8000;
const { loggerMiddleware } = require("./middlewares/logger.middleware");
const bookRouter = require("./routes/book.routes");
const authorRouter = require("./routes/author.routes");

app.use(express.json());
app.use(loggerMiddleware);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
