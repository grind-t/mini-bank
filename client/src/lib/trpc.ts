import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type {
  AppRouter,
  RouterInput,
  RouterOutput,
} from "../../../server/src/features/app/trpc/router";
import SuperJSON from "superjson";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
      transformer: SuperJSON,
    }),
  ],
});

export { trpc };
export type { RouterInput, RouterOutput };

export type Bond = RouterOutput["bonds"]["list"][number];
export type BondListFilter = NonNullable<
  RouterInput["bonds"]["list"]["filter"]
>;

export type DCAStrategy = NonNullable<RouterOutput["dcaStrategies"]["get"]>;
export type DCAStrategyAsset = DCAStrategy["assets"][number];

export type EstateInflation = RouterOutput["inflation"]["estate"]["get"];
export type EstateInflationParams = RouterInput["inflation"]["estate"]["get"];

export type StringFilter = NonNullable<BondListFilter["sector"]>;
export type NumberFilter = NonNullable<BondListFilter["ytm"]>;
export type DateFilter = NonNullable<BondListFilter["maturityDate"]>;
export type BooleanFilter = NonNullable<BondListFilter["forQual"]>;
