import { getSession } from "@auth/express";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { authConfig } from "../auth/config.ts";

export type Context = Awaited<ReturnType<typeof createContext>>;

export const createContext = async ({ req }: CreateExpressContextOptions) => {
  return { session: await getSession(req, authConfig) };
};
