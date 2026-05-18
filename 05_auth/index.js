const express = require("express");
const app = express();
const PORT = 8000;

const DIARY = {
};

const EMAILS = new Set();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (EMAILS.has(email)) {
    res.status(400).json({ error: "User already exists" });
  }
  const token = Date.now().toString(36) + Math.random().toString(36).substr(2);
  DIARY[token] = { name, password, email };
  EMAILS.add(email);
  res.status(201).json({ message: "Signup successful", token });
});

app.post("/me", (req, res) => {
  const {token} = req.body;

  if(!token) return res.status(400).json({ error: "Token is required" });
  if(!(token in DIARY)) return res.status(401).json({ error: "Invalid token" });

  const user = DIARY[token];
  if (user) {
    res.status(200).json({ name: user.name, email: user.email });
  } else {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
