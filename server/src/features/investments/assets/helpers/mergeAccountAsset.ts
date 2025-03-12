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
