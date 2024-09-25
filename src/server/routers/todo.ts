import { db } from "@/Database/drizzle";
import { procedure, router } from "../trpc";
import { todo } from "@/Database/schema";
import { number, object, string } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const todoRouter = router({
  list: procedure.query(() => {
    return db.select().from(todo);
  }),
  get: procedure
    .input(
      object({
        id: number(),
      }).required({
        id: true,
      })
    )
    .query((opts) => {
      return db.select().from(todo).where(eq(todo.id, opts.input.id));
    }),
  insert: procedure
    .input(
      object({
        item: string(),
      }).required({ item: true })
    )
    .mutation(async (opts) => {
      await db.insert(todo).values(opts.input);
      return "Success";
    }),
  update: procedure
    .input(
      object({
        id: number(),
        item: string(),
      }).required({ id: true, item: true })
    )
    .mutation(async (opt) => {
      console.log(opt.input);
      await db
        .update(todo)
        .set({
          item: opt.input.item,
        })
        .where(eq(todo.id, opt.input.id));
      return "Success";
    }),
  delete: procedure
    .input(
      object({
        id: number(),
      })
    )
    .mutation(async (opt) => {
      await db.delete(todo).where(eq(todo.id, opt.input.id));
      return "Success";
    }),
});
