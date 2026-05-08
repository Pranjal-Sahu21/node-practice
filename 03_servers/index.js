const http = require("http");

const server = http.createServer((req, res) => {
    console.log("An incoming response was recorded");
    res.writeHead(200);
    res.end("Thanks for visiting our server!");
});

server.listen(8000, () => {
    console.log("Server is listening on port 8000");
})
