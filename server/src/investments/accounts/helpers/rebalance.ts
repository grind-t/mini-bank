import type { InvestAccountAsset } from "../model.ts";

export function rebalanceInvestAccount(
  assets: InvestAccountAsset[],
  targetRatios: number[],
  budget: number
): InvestAccountAsset[] {
  const rebalancedAssets = structuredClone(assets);

  if (!budget || !assets.length) return rebalancedAssets;

  const currentSums = assets.map((v) => v.quantity * v.averagePrice);
  const totalSum = currentSums.reduce((acc, sum) => acc + sum, budget);
  const desiredSums = targetRatios.map((v) => totalSum * v);
  const desiredDiffs = desiredSums.map((sum, i) => sum - currentSums[i]);

  while (budget > 0) {
    const maxDiffIdx = desiredDiffs.reduce(
      (maxIdx, _, idx, arr) => (arr[idx] > arr[maxIdx] ? idx : maxIdx),
      0
    );
    const diff = desiredDiffs[maxDiffIdx];
    const asset = assets[maxDiffIdx];

    if (diff <= 0) {
      break;
    }

    if (asset.currentPrice > diff) {
      desiredDiffs[maxDiffIdx] = 0;
      continue;
    }

    if (asset.currentPrice > budget) {
      break;
    }

    rebalancedAssets[maxDiffIdx].quantity++;
    desiredDiffs[maxDiffIdx] -= asset.currentPrice;
    budget -= asset.currentPrice;
  }

  return rebalancedAssets;
}
