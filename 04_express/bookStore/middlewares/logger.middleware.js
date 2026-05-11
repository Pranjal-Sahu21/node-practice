const fs = require("fs");

exports.loggerMiddleware = (req, res, next) => {
  const logEntry = `[${new Date().toISOString()}]: ${req.method} ${req.url}\n`;
  fs.appendFileSync("log.txt", logEntry, "utf-8");
  next();
};