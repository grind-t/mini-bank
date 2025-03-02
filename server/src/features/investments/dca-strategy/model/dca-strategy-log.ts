import type { InvestAccountAsset } from "../../accounts/model.ts";
import type { DCAStrategy } from "./dca-strategy.ts";

export type DCAStrategyLogPayload = {
  strategy: DCAStrategy;
  initialAssets: InvestAccountAsset[];
  budget: number;
  rebalancedAssets: InvestAccountAsset[];
};

export type DCAStrategyLog = DCAStrategyLogPayload & { timestamp: number };

export const dcaStrategiesLogsKey = "dca_strategies_logs";
