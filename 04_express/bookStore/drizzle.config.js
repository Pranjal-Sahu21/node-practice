require("dotenv/config");
const { defineConfig } = require("drizzle-kit");

const config = defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./models/index.js",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      `postgresql://${process.env.POSTGRES_USER || 'postgres'}:${process.env.POSTGRES_PASSWORD || 'password'}@localhost:5432/${process.env.POSTGRES_DB || 'mydb'}`,
  },
});

module.exports = config;
