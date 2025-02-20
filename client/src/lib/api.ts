import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/main";
import { user } from "./auth/user.svelte";
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      headers: () => ({
        Authorization: `Basic ${btoa(`${user.name}:${user.password}`)}`,
      }),
    }),
  ],
});

export const getBonds = trpc.bonds.list.query;
export const getDCAStrategy = trpc.dcaStrategies.get.query;
export const setDCAStrategy = trpc.dcaStrategies.set.mutate;
