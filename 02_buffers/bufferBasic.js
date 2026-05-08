const { Buffer } = require("buffer");

const buffer1 = Buffer.alloc(5);
console.log(buffer1);
console.log(buffer1[1]);

const buffer2 = Buffer.from("Hello, this is Pranjal.");
console.log(buffer2);
console.log(buffer2.toString());

const buffer3 = Buffer.alloc(10);
buffer3.write("Hello");
console.log(buffer3.toString());

const buffer4 = Buffer.from("Pranjal Sahu");
console.log(buffer4.toString());
console.log(buffer4.toString("utf-8", 0, 7));

const buffer5 = Buffer.from("Mohit");
console.log(buffer5);
buffer5[0] = 0x52; // ASCII code for 'R'
console.log(buffer5);
console.log(buffer5.toString());

const buffer6 = Buffer.from("Pranjal");
const buffer7 = Buffer.from(" Sahu");
const mergedBuffer = Buffer.concat([buffer6, buffer7]);
console.log(mergedBuffer.toString());
console.log(mergedBuffer.length);