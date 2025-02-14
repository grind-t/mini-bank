import type { DCAStrategyAsset } from "../model.ts";

export function getDCAStrategyAssetsRatios(
  assets: DCAStrategyAsset[]
): number[] {
  const totalWeight = assets.reduce((total, asset) => total + asset.weight, 0);

  return assets.map((asset) => asset.weight / totalWeight);
}
