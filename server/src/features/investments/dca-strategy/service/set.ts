import { redis } from "#src/redis.ts";
import { dcaStrategiesKey, type DCAStrategy } from "../model/dca-strategy.ts";

export async function setDCAStrategy(value: DCAStrategy): Promise<void> {
  await redis
    .multi()
    .set(`${dcaStrategiesKey}:${value.id}`, JSON.stringify(value))
    .sadd(dcaStrategiesKey, value.id)
    .exec();
}
