import { redis } from "#app/database/redis.ts";
import { dcaStrategiesKey, type DCAStrategy } from "../model/dcaStrategy.ts";

export async function setDCAStrategy(value: DCAStrategy): Promise<void> {
  await redis
    .multi()
    .set(`${dcaStrategiesKey}:${value.id}`, JSON.stringify(value))
    .sadd(dcaStrategiesKey, value.id)
    .exec();
}
