import type { InvestAccountAsset } from "#features/investments/accounts/model.ts";
import { redis } from "#src/redis.ts";
import { dbKey, type DCAStrategy } from "../model.ts";

export type DCAStrategyLogPayload = {
  strategy: DCAStrategy;
  initialAssets: InvestAccountAsset[];
  budget: number;
  rebalancedAssets: InvestAccountAsset[];
};

export type DCAStrategyLog = DCAStrategyLogPayload & { timestamp: number };

export async function logDCAStrategy(payload: DCAStrategyLogPayload) {
  const timestamp = Date.now();
  await redis.zadd(
    `${dbKey}_logs`,
    timestamp,
    JSON.stringify({ ...payload, timestamp })
  );
}
