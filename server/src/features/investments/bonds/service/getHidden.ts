import { redis } from "#src/redis.ts";
import { hiddenBondsKey } from "../model/hiddenBond.ts";

export async function getHiddenBonds() {
  return await redis.smembers(hiddenBondsKey);
}
