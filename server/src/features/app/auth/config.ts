import type { ExpressAuthConfig } from "@auth/express";
import Google from "@auth/express/providers/google";

export const authConfig: ExpressAuthConfig = {
  providers: [Google],
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.id = `${account.provider}:${account.providerAccountId}`;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
