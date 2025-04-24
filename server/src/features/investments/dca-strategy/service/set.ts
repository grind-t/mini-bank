import { redis } from "#app/database/redis.ts";
import type { UserCtx } from "#features/app/auth/model.ts";
import { dcaStrategiesKey, type DCAStrategy } from "../model/dcaStrategy.ts";

export async function setDCAStrategy(
  value: DCAStrategy,
  ctx: UserCtx
): Promise<void> {
  const { user } = ctx;

  await redis
    .multi()
    .set(`${dcaStrategiesKey}:${user.id}:${value.id}`, JSON.stringify(value))
    .sadd(dcaStrategiesKey, value.id)
    .exec();
}
