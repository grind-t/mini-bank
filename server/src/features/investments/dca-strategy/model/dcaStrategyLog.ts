import type { InvestAccountAsset } from "../../accounts/model.ts";
import type { DCAStrategy } from "./dcaStrategy.ts";

export type DCAStrategyLogPayload = {
  strategy: DCAStrategy;
  initialAssets: InvestAccountAsset[];
  budget: number;
  spent: number;
  rebalancedAssets: InvestAccountAsset[];
  orderIds: string[];
  orderErrors: string[];
};

export type DCAStrategyLog = DCAStrategyLogPayload & { timestamp: number };

export const dcaStrategiesLogsKey = "dca_strategies_logs";
