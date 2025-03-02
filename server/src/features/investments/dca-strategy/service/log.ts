import { redis } from "#src/redis.ts";
import {
  dcaStrategiesLogsKey,
  type DCAStrategyLogPayload,
} from "../model/dca-strategy-log.ts";

export async function logDCAStrategy(payload: DCAStrategyLogPayload) {
  const timestamp = Date.now();
  await redis.zadd(
    `${dcaStrategiesLogsKey}:${payload.strategy.id}`,
    timestamp,
    JSON.stringify({ ...payload, timestamp })
  );
}
