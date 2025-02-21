import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router, createContext } from "./common/config/trpc.ts";
import cors from "cors";
import { bonds } from "./investments/bonds/trpc.ts";
import { dcaStrategies } from "./investments/dca-strategy/trpc.ts";

const dev = process.env.NODE_ENV === "development";

const appRouter = router({
  bonds,
  dcaStrategies,
});

const server = createHTTPServer({
  middleware: cors({
    origin: dev ? /http:\/\/localhost:\d+$/ : "https://grind-t.github.io",
    credentials: true,
  }),
  router: appRouter,
  createContext,
});

server.listen(process.env.PORT || 3000);

export type AppRouter = typeof appRouter;
