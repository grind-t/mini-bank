import type { InvestAccountAsset } from "../model.ts";

export function rebalanceInvestAccount(
  assets: InvestAccountAsset[],
  targetRatios: number[],
  budget: number
): InvestAccountAsset[] {
  const rebalancedAssets = structuredClone(assets);

  if (!budget || !assets.length) return rebalancedAssets;

  const balances = assets.map((v) => v.quantity * v.averagePrice);
  const totalBalance = balances.reduce((acc, v) => acc + v, 0);
  const targetBalance = totalBalance + budget;
  const targetBalances = targetRatios.map((v) => targetBalance * v);
  const diffs = targetBalances.map((v, i) => v - balances[i]);

  while (budget > 0) {
    const maxDiffIdx = diffs.reduce((i, _, j, v) => (v[i] > v[j] ? i : j), 0);
    const asset = assets[maxDiffIdx];

    if (asset.currentPrice > budget) {
      break;
    }

    rebalancedAssets[maxDiffIdx].quantity++;
    diffs[maxDiffIdx] -= asset.currentPrice;
    budget -= asset.currentPrice;
  }

  return rebalancedAssets;
}
