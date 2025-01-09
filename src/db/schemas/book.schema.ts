import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const books = pgTable("books", {
  id: uuid("id").primaryKey().unique(),
  title: varchar("title").notNull(),
  author: varchar("author").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})
