import type {
  InvestAccountAsset,
  InvestAccountAssetShort,
} from "../../accounts/model.ts";
import type { Asset } from "../model.ts";

export function mergeAccountAsset(
  asset: Asset,
  accountAsset?: InvestAccountAssetShort
): InvestAccountAsset {
  return {
    id: asset.id,
    isin: asset.isin,
    name: asset.name,
    quantity: accountAsset?.quantity || 0,
    currentPrice: asset.currentPrice,
    averagePrice: accountAsset?.averagePrice || 0,
  };
}
