import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { getBonds } from "./lib/bonds.ts";
import { publicProcedure, router } from "./trpc.ts";
import { z } from "zod";
import { getDCAStrategy, setDCAStrategy } from "./lib/assets/dca-strategy.ts";

const kv = await Deno.openKv();

const appRouter = router({
  getBonds: publicProcedure.query(async () => {
    return await getBonds();
  }),
  getDCAStrategy: publicProcedure.input(z.object({
    id: z.string(),
  })).query(
    async ({ input }) => {
      return await getDCAStrategy(input.id, kv);
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
        return await setDCAStrategy(input, kv);
      },
    ),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

export type AppRouter = typeof appRouter;
