const eventEmitter = require("events");

class Chat extends eventEmitter {
    sendMessage(message) {
        console.log(`Message sent: ${message}`);
        this.emit("messageSent", message);
    }
}

const chat = new Chat();

chat.on("messageSent", (message) => {
    console.log(`Message received: ${message}`);
});

chat.sendMessage("Hello, this is a message from the Chat class!");