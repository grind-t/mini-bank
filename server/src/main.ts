import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { getBonds } from "./lib/bonds.ts";
import { publicProcedure, router } from "./trpc.ts";
import { z } from "zod";
import { Level } from "level";

const db = new Level<string, any>("./db", { valueEncoding: "json" });
const dcaStrategies = db.sublevel<string, any>("dca-strategies", {
  valueEncoding: "json",
});

const appRouter = router({
  getBonds: publicProcedure.query(async () => {
    return await getBonds();
  }),
  getDCAStrategy: publicProcedure.input(z.object({
    id: z.string(),
  })).query(
    async ({ input }) => {
      return await dcaStrategies.get(input.id);
    },
  ),
  setDCAStrategy: publicProcedure.input(
    z.object({
      id: z.string(),
      currentMonthBudget: z.number(),
      assets: z.array(z.object({ isin: z.string(), weight: z.number() })),
    }),
  )
    .mutation(
      async ({ input }) => {
        // TODO: Auth
        return dcaStrategies.put(input.id, input);
      },
    ),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

export type AppRouter = typeof appRouter;
