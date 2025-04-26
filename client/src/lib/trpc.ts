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
