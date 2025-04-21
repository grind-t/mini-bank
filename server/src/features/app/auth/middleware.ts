import { ExpressAuth } from "@auth/express";
import { authConfig } from "./config.ts";

export const authMiddleware = ExpressAuth(authConfig);
