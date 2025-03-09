import type { InvestAccountAsset } from "../../accounts/model.ts";
import type { Asset } from "../model.ts";

export function mergeAccountAsset(
  asset: Asset,
  accountAsset?: InvestAccountAsset
): InvestAccountAsset {
  return {
    id: asset.id,
    quantity: accountAsset?.quantity || 0,
    currentPrice: asset.currentPrice,
    averagePrice: accountAsset?.averagePrice || 0,
  };
}

export function mergeAccountAssets(
  assets: Asset[],
  accountAssets: InvestAccountAsset[]
): InvestAccountAsset[] {
  const accountAssetsRecord = accountAssets.reduce((record, asset) => {
    record[asset.id] = asset;
    return record;
  }, {} as Record<string, InvestAccountAsset | undefined>);

  return assets.map((asset) =>
    mergeAccountAsset(asset, accountAssetsRecord[asset.id])
  );
}
