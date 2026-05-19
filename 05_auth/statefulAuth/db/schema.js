import { pgTable, varchar, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ['USER', 'ADMIN'])

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  role: userRoleEnum().notNull().default('USER'),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => usersTable.id).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
