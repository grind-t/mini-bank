import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../../server/src/main";
import { user } from "$lib/auth/user.svelte";
import SuperJSON from "superjson";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.DEV
        ? "http://localhost:3000"
        : "https://bbac3tn498gvd9kvthnn.containers.yandexcloud.net/",
      headers: () => ({
        Authorization: `Basic ${btoa(`${user.name}:${user.password}`)}`,
        "x-yandex-cloud-authorization": `Basic ${btoa(`${user.name}:${user.password}`)}`,
      }),
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
      transformer: SuperJSON,
    }),
  ],
});

export const getBonds = trpc.bonds.list.query;
export const getDCAStrategy = trpc.dcaStrategies.get.query;
export const setDCAStrategy = trpc.dcaStrategies.set.mutate;
export const executeDCAStrategy = trpc.dcaStrategies.execute.mutate;
export const getDCAStrategyLogs = trpc.dcaStrategies.logs.query;

export type Bond = Awaited<ReturnType<typeof getBonds>>[number];
export type BondListFilter = Parameters<typeof getBonds>[0]["filter"];
export type DCAStrategy = Exclude<
  Awaited<ReturnType<typeof getDCAStrategy>>,
  null
>;
export type DCAStrategyAsset = DCAStrategy["assets"][number];
export type DCAStrategyLog = Awaited<
  ReturnType<typeof getDCAStrategyLogs>
>[number];
