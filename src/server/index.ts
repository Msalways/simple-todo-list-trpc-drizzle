import { todoRouter } from "./routers/todo";
import { router } from "./trpc";

export const appRouter = router({
  todoRouter,
});

export type AppRouter = typeof appRouter;
