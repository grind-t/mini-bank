import { redis } from "#app/database/redis.ts";
import type { UserCtx } from "#features/app/auth/model.ts";
import {
  dcaStrategiesLogsKey,
  type DCAStrategyLog,
} from "../model/dcaStrategyLog.ts";

export async function getDCAStrategyLogs(
  id: string,
  from: Date,
  to: Date,
  ctx: UserCtx
): Promise<DCAStrategyLog[]> {
  const { user } = ctx;

  const logs = await redis.zrangebyscore(
    `${dcaStrategiesLogsKey}:${user.id}:${id}`,
    from.getTime(),
    to.getTime()
  );

  return logs.map((json) => JSON.parse(json));
}
