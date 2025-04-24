import { z } from "zod";
import { protectedProcedure, publicProcedure } from "#app/trpc/root.ts";
import { getDCAStrategy } from "./service/get.ts";
import { setDCAStrategy } from "./service/set.ts";
import { TRPCError } from "@trpc/server";
import { executeDCAStrategy } from "./service/exec.ts";
import { getDCAStrategyLogs } from "./service/getLogs.ts";
import { TinkoffInvestApi } from "tinkoff-invest-api";

export const dcaStrategies = {
  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await getDCAStrategy(input.id, ctx.session);
    }),
  set: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentMonthBudget: z.number(),
        assets: z.array(z.object({ isin: z.string(), weight: z.number() })),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await setDCAStrategy(input, ctx.session);
    }),
  execute: protectedProcedure
    .input(
      z.object({
        strategyId: z.string(),
        accountId: z.string(),
        accountToken: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const strategy = await getDCAStrategy(input.strategyId, ctx.session);

      if (!strategy) {
        throw new TRPCError({
          message: "Strategy not found",
          code: "NOT_FOUND",
        });
      }

      await executeDCAStrategy(strategy, input.accountId, {
        user: ctx.session.user,
        tInvestApi: new TinkoffInvestApi({ token: input.accountToken }),
      });
    }),
  logs: protectedProcedure
    .input(z.object({ id: z.string(), from: z.date(), to: z.date() }))
    .query(async ({ input, ctx }) => {
      return await getDCAStrategyLogs(
        input.id,
        input.from,
        input.to,
        ctx.session
      );
    }),
};
