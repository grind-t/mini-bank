import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";
import type { Context } from "./context.ts";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const createRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use((opts) => {
  if (!opts.ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next();
});
