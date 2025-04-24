import type { InvestAccountAsset } from "../../accounts/model.ts";
import type { Asset } from "../../assets/model.ts";
import type { DCAStrategy } from "./dcaStrategy.ts";

export type DCAStrategyLogPayload = {
  userId: string;
  strategy: DCAStrategy;
  budget: number;
  initialAssets: InvestAccountAsset[];
  rebalancedAssets: InvestAccountAsset[];
  orderedAssets: (Asset & { quantity: number; error?: string })[];
};

export type DCAStrategyLog = DCAStrategyLogPayload & { timestamp: number };

export const dcaStrategiesLogsKey = "dca_strategies_logs";
