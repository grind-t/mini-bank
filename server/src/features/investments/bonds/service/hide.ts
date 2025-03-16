import { redis } from "#src/redis.ts";
import { hiddenBondsKey } from "../model/hiddenBond.ts";

export async function hideBond(id: string) {
  await redis.sadd(hiddenBondsKey, id);
}
