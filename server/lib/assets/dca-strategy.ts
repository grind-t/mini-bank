export type DCAStrategyAsset = {
  isin: string;
  weight: number;
};

export type DCAStrategy = {
  id: string;
  currentMonthBudget: number;
  assets: DCAStrategyAsset[];
};

export async function getDCAStrategy(
  id: string,
  storage: Deno.Kv,
): Promise<DCAStrategy | null> {
  const data = await storage.get<DCAStrategy>(["dca-strategy", id]);
  return data.value;
}

export async function setDCAStrategy(
  strategy: DCAStrategy,
  storage: Deno.Kv,
): Promise<boolean> {
  const result = await storage.set(["dca-strategy", strategy.id], strategy);
  return result.ok;
}
