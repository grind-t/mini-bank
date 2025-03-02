import { redis } from "#src/redis.ts";
import { dcaStrategiesKey, type DCAStrategy } from "../model/dca-strategy.ts";

export async function getDCAStrategy(id: string): Promise<DCAStrategy | null> {
  const json = await redis.get(`${dcaStrategiesKey}:${id}`);
  return json && JSON.parse(json);
}
