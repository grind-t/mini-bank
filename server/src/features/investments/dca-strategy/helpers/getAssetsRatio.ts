import { sum } from "@grind-t/toolkit";
import type { DCAStrategyAsset } from "../model/dca-strategy.ts";

export function getDCAStrategyAssetsRatios(
  assets: DCAStrategyAsset[]
): number[] {
  const totalWeight = sum(assets, (item) => item.weight);

  return assets.map((asset) => asset.weight / totalWeight);
}
