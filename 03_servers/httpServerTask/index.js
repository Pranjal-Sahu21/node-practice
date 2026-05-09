const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().toISOString();
  fs.appendFileSync(
    "log.txt",
    `[${date}]: ${method} ${url}\n`,
    "utf-8",
    (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    },
  );

  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          return res.writeHead(200).end("Welcome to our homepage!");
          break;
        case "/contact-us":
          return res
            .writeHead(200)
            .end("Email: sahupranjal1619@gmail.com \nPhone: +91 1234567890");
          break;
        case "/tweets":
          return res.writeHead(200).end("Here are the latest tweets!");
          break;
      }
      break;
    case "POST":
      switch (url) {
        case "/tweet":
          return res
            .writeHead(201)
            .end("Your tweet has been posted successfully!");
          break;
      }
      break;
    default:
      fs.appendFileSync(
        "log.txt",
        `[${date}]: Received a ${method} request at ${url}\n`,
        "utf-8",
        (err) => {
          if (err) {
            console.error("Error writing to log file:", err);
          }
        },
      );
  }

  res.writeHead(404).end("You're lost! This page doesn't exist.");
});

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
