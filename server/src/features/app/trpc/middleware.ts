import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { router } from "./router.ts";
import { createContext } from "./context.ts";

export const trpcMiddleware = createExpressMiddleware({
  router,
  createContext,
});
