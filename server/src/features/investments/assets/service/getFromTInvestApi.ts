import type { Asset } from "../model.ts";
import tInvestApi from "#features/investments/integrations/t-invest-api/core.ts";
import { getAssetPriceFromTInvestApi } from "./getPriceFromTInvestApi.ts";
import { isNullish } from "@grind-t/toolkit";

export async function getAssetFromTInvestApi(
  id: string
): Promise<Asset | null> {
  const instrument = await tInvestApi.instruments
    .findInstrument({
      query: id,
      apiTradeAvailableFlag: true,
    })
    .then((v) => v.instruments[0]);

  if (isNullish(instrument)) {
    return null;
  }

  const currentPrice = await getAssetPriceFromTInvestApi(instrument);

  if (isNullish(currentPrice)) {
    return null;
  }

  return {
    id: instrument.uid,
    currentPrice,
  };
}

export function getAssetsFromTInvestApi(ids: string[]) {
  return Promise.all(ids.map((id) => getAssetFromTInvestApi(id)));
}
