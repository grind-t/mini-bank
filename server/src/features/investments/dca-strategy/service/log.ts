import { redis } from "#app/database/redis.ts";
import {
  dcaStrategiesLogsKey,
  type DCAStrategyLogPayload,
} from "../model/dcaStrategyLog.ts";

export async function logDCAStrategy(payload: DCAStrategyLogPayload) {
  const timestamp = Date.now();
  await redis.zadd(
    `${dcaStrategiesLogsKey}:${payload.strategy.id}`,
    timestamp,
    JSON.stringify({ ...payload, timestamp })
  );
}
