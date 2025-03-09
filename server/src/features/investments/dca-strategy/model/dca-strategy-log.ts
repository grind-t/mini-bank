import type { InvestAccountAsset } from "../../accounts/model.ts";
import type { DCAStrategy } from "./dca-strategy.ts";

export type DCAStrategyLogPayload = {
  strategy: DCAStrategy;
  initialAssets: InvestAccountAsset[];
  budget: number;
  spent: number;
  rebalancedAssets: InvestAccountAsset[];
  orderIds: string[];
};

export type DCAStrategyLog = DCAStrategyLogPayload & { timestamp: number };

export const dcaStrategiesLogsKey = "dca_strategies_logs";
