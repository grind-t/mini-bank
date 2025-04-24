import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";
import type { Context } from "./context.ts";
import dayjs from "dayjs";
import type { SetRequired } from "type-fest";
import type { User } from "@auth/express";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const createRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use((opts) => {
  if (!opts.ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { user, expires } = opts.ctx.session;

  if (dayjs(expires).isBefore(dayjs())) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Session expired" });
  }

  if (!user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User is missing" });
  }

  return opts.next({
    ctx: {
      session: {
        expires,
        user: user as SetRequired<User, "id">,
      },
    },
  });
});
