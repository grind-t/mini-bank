export type DCAStrategyAsset = {
  id: string;
  weight: number;
};

export type DCAStrategy = {
  id: string;
  currentMonthBudget: number;
  assets: DCAStrategyAsset[];
};

export const dcaStrategiesKey = "dca_strategies";
