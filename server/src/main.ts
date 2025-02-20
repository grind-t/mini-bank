import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router, createContext } from "./common/config/trpc.ts";
import cors from "cors";
import { bonds } from "./investments/bonds/trpc.ts";
import { dcaStrategies } from "./investments/dca-strategy/trpc.ts";

const appRouter = router({
  bonds,
  dcaStrategies,
});

const server = createHTTPServer({
  middleware: cors({
    origin: "https://grind-t.github.io/mini-bank",
    credentials: true,
  }),
  router: appRouter,
  createContext,
});

server.listen(process.env.PORT || 3000);

export type AppRouter = typeof appRouter;
