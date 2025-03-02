import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../../../trpc.ts";
import { getDCAStrategy } from "./service/get.ts";
import { setDCAStrategy } from "./service/set.ts";
import { TRPCError } from "@trpc/server";
import { executeDCAStrategy } from "./service/exec.ts";
import { getDCAStrategyLogs } from "./service/get-logs.ts";

export const dcaStrategies = {
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await getDCAStrategy(input.id);
    }),
  set: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentMonthBudget: z.number(),
        assets: z.array(z.object({ id: z.string(), weight: z.number() })),
      })
    )
    .mutation(async ({ input }) => {
      return await setDCAStrategy(input);
    }),
  execute: protectedProcedure
    .input(z.object({ strategyId: z.string(), accountId: z.string() }))
    .mutation(async ({ input }) => {
      const strategy = await getDCAStrategy(input.strategyId);

      if (!strategy) {
        throw new TRPCError({
          message: "Strategy not found",
          code: "NOT_FOUND",
        });
      }

      await executeDCAStrategy(strategy, input.accountId);
    }),
  logs: publicProcedure
    .input(z.object({ id: z.string(), from: z.date(), to: z.date() }))
    .query(async ({ input }) => {
      return await getDCAStrategyLogs(input.id, input.from, input.to);
    }),
};
