const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`Incoming request at [${new Date().toISOString()}]`);
  console.log(req.headers);
  console.log(req.method);
  console.log(req.url);

  switch (req.url) {
    case "/":
      res.writeHead(200);
      res.end("Welcome to our homepage!");
      break;
    case "/contact-us":
      res.writeHead(200);
      res.end("Contact me at sahupranjal1619@gmail.com");
      break;
    case "/about":
      res.writeHead(200);
      res.end("I am a Software Engineer.");
      break;
    default:
      res.writeHead(404);
      res.end("You're lost! This page doesn't exist.");
  }
});

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
