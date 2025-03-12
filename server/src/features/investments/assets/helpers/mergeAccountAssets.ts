import { toRecord } from "#src/features/toolkit/toRecord.ts";
import type { InvestAccountAsset } from "../../accounts/model.ts";
import type { Asset } from "../model.ts";
import { mergeAccountAsset } from "./mergeAccountAsset.ts";

export function mergeAccountAssets(
  assets: Asset[],
  accountAssets: InvestAccountAsset[]
): InvestAccountAsset[] {
  const accountAssetsRecord = toRecord(accountAssets, (item) => item.id);

  return assets.map((asset) =>
    mergeAccountAsset(asset, accountAssetsRecord[asset.id])
  );
}
