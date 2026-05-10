const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.get("/contact-us", (req, res) => {
  res.send("Contact us at sahupranjal1619@gmail.com");
});

app.get("/tweets", (req, res) => {
  res.send("Here are your tweets!");
});

app.post("/tweet", (req, res) => {
  res.status(201).send("Tweet posted successfully!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
