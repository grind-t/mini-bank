import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

export const createContext = (opts: CreateHTTPContextOptions) => {
  const credentials = opts.req.headers.authorization?.split(" ")[1] || "";
  const [username, password] = Buffer.from(credentials, "base64")
    .toString("utf-8")
    .split(":");

  return {
    username,
    password,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use((opts) => {
  if (opts.ctx.password !== process.env.PASSWORD) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next();
});
