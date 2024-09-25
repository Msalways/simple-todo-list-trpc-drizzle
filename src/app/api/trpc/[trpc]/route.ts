import { appRouter } from "@/server";
import { router } from "@/server/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    router: appRouter,
    req: req,
    endpoint: "/api/trpc",
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
