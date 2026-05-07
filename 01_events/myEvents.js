const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (username) => {
  console.log(`Hello, ${username}! Welcome to the event emitter example!`);
});

eventEmitter.once("greetOnce", (username) => {
  console.log(`This will only be logged once for ${username}.`);
});

const myListener = () => console.log("I am a test listener.");
eventEmitter.on("testEvent", myListener);

// Emit the testEvent to see the listener in action
eventEmitter.emit("testEvent");

eventEmitter.removeListener("testEvent", myListener);

// Emit the testEvent again to confirm the listener has been removed
eventEmitter.emit("testEvent");

// Will run twice
eventEmitter.emit("greet", "Pranjal");
eventEmitter.emit("greet", "Pranjal");

//Will run only once
eventEmitter.emit("greetOnce", "Pranjal");
eventEmitter.emit("greetOnce", "Pranjal");

// Check the listeners for each event
console.log(eventEmitter.listeners("testEvent"));
console.log(eventEmitter.listeners("greet"));
console.log(eventEmitter.listeners("greetOnce"));
