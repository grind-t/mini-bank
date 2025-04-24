import type { User } from "@auth/express";
import type { SetRequired } from "type-fest";

export type UserCtx = {
  user: SetRequired<User, "id">;
};
