export type Asset = {
  id: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  targetRatio: number;
};

export type RebalancedAsset = {
  asset: Asset;
  needToBuy: number;
};

export function rebalanceAssets(
  assets: Asset[],
  additionalMoney: number,
): RebalancedAsset[] {
  const result = assets.map((asset) => ({ asset, needToBuy: 0 }));

  if (!additionalMoney || !assets.length) return result;

  const currentSums = assets.map((asset) => asset.quantity * asset.avgPrice);
  const totalSum = currentSums.reduce((acc, sum) => acc + sum, additionalMoney);
  const desiredSums = assets.map((asset) => totalSum * asset.targetRatio);
  const desiredDiffs = desiredSums.map((sum, i) => sum - currentSums[i]);

  while (additionalMoney > 0) {
    let maxDiffIdx = 0;

    for (let i = 1; i < desiredDiffs.length; i++) {
      if (desiredDiffs[i] > desiredDiffs[maxDiffIdx]) {
        maxDiffIdx = i;
      }
    }

    const diff = desiredDiffs[maxDiffIdx];
    const asset = assets[maxDiffIdx];

    if (diff <= 0) {
      break;
    }

    if (asset.currentPrice > diff) {
      desiredDiffs[maxDiffIdx] = 0;
      continue;
    }

    if (asset.currentPrice > additionalMoney) {
      break;
    }

    result[maxDiffIdx].needToBuy++;
    desiredDiffs[maxDiffIdx] -= asset.currentPrice;
    additionalMoney -= asset.currentPrice;
  }

  return result;
}
