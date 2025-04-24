import { redis } from "#app/database/redis.ts";
import type { UserCtx } from "#features/app/auth/model.ts";
import { dcaStrategiesKey, type DCAStrategy } from "../model/dcaStrategy.ts";

export async function getDCAStrategy(
  id: string,
  ctx: UserCtx
): Promise<DCAStrategy | null> {
  const { user } = ctx;
  const json = await redis.get(`${dcaStrategiesKey}:${user.id}:${id}`);
  return json && JSON.parse(json);
}
