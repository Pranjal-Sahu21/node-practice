import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./db/schema.js",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

export default config;
