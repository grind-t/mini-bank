import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/main";
import { user } from "./auth/user.svelte";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.DEV
        ? "http://localhost:3000"
        : "https://bbac3tn498gvd9kvthnn.containers.yandexcloud.net/",
      headers: () => ({
        Authorization: `Basic ${btoa(`${user.name}:${user.password}`)}`,
      }),
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

export const getBonds = trpc.bonds.list.query;
export const getDCAStrategy = trpc.dcaStrategies.get.query;
export const setDCAStrategy = trpc.dcaStrategies.set.mutate;
export const executeDCAStrategy = trpc.dcaStrategies.execute.mutate;
