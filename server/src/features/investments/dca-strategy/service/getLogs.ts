import { redis } from "#app/database/redis.ts";
import {
  dcaStrategiesLogsKey,
  type DCAStrategyLog,
} from "../model/dcaStrategyLog.ts";

export async function getDCAStrategyLogs(
  id: string,
  from: Date,
  to: Date
): Promise<DCAStrategyLog[]> {
  const logs = await redis.zrangebyscore(
    `${dcaStrategiesLogsKey}:${id}`,
    from.getTime(),
    to.getTime()
  );

  return logs.map((json) => JSON.parse(json));
}
