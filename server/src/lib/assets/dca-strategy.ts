export type DCAStrategyAsset = {
  isin: string;
  weight: number;
};

export type DCAStrategy = {
  id: string;
  currentMonthBudget: number;
  assets: DCAStrategyAsset[];
};
