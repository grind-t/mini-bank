import { toRecord } from "@grind-t/toolkit";
import type {
  InvestAccountAsset,
  InvestAccountAssetShort,
} from "../../accounts/model.ts";
import type { Asset } from "../model.ts";
import { mergeAccountAsset } from "./mergeAccountAsset.ts";

export function mergeAccountAssets(
  assets: Asset[],
  accountAssets: InvestAccountAssetShort[]
): InvestAccountAsset[] {
  const accountAssetsRecord = toRecord(accountAssets, (item) => item.id);

  return assets.map((asset) =>
    mergeAccountAsset(asset, accountAssetsRecord[asset.id])
  );
}
