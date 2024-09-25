import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  item: text("item"),
});
