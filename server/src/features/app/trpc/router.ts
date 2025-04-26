import { bonds } from "#features/investments/bonds/trpc.ts";
import { dcaStrategies } from "#features/investments/dca-strategy/trpc.ts";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createRouter } from "./root.ts";

export const router = createRouter({
  bonds,
  dcaStrategies,
});

export type AppRouter = typeof router;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
