import { getContext, setContext } from "svelte";
import type { User } from "./api";

const key = Symbol("user");

export function setUserContext(user: User | null): void {
  setContext(key, user);
}

export function getUserContext(): User | null {
  return getContext(key);
}
