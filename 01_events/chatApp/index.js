const ChatRoom = require("./ChatRoom");

const chatRoom = new ChatRoom();

chatRoom.on("join", (user) => {
  console.log(`${user} has joined the chat room.`);
});

chatRoom.on("message", (user, message) => {
  console.log(`${user}: ${message}`);
});

chatRoom.on("leave", (user) => {
    console.log(`${user} has left the chat room.`);
});

//Simulating chatRoom activity
chatRoom.join("Alice");
chatRoom.join("Bob");
chatRoom.sendMessage("Alice", "Hello, Bob!");
chatRoom.sendMessage("Bob", "Hello, Alice!");
chatRoom.leave("Alice");
chatRoom.leave("Bob");
chatRoom.sendMessage("Alice", "This message should not be sent.");
