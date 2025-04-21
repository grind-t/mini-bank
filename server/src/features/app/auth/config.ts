import type { ExpressAuthConfig } from "@auth/express";
import Google from "@auth/express/providers/google";

export const authConfig: ExpressAuthConfig = {
  providers: [Google],
};
