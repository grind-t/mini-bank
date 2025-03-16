import { redis } from "#src/redis.ts";
import { hiddenBondsKey } from "../model/hiddenBond.ts";

export async function showBond(id: string) {
  await redis.srem(hiddenBondsKey, id);
}
