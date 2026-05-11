const express = require("express");
const app = express();
const PORT = 8000;
const { loggerMiddleware } = require("./middlewares/logger.middleware");
const bookRouter = require("./routes/book.routes");

app.use(express.json());
app.use(loggerMiddleware);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



