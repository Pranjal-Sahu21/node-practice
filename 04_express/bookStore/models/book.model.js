const {
  pgTable,
  integer,
  varchar,
  uuid,
  text,
  index,
} = require("drizzle-orm/pg-core");
const { authorsTable } = require("./author.model");
const { sql } = require("drizzle-orm");

const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    authorId: uuid()
      .references(() => authorsTable.id)
      .notNull(),
  },
  (table) => ({
    searchIndexOnTitle: index('title_index').using(
      "gin",
      sql`to_tsvector('english', ${table.title})`,
    ),
  }),
);

module.exports = { booksTable };
