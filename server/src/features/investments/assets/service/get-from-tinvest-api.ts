import type { Asset } from "../model.ts";
import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";
import { getAssetPriceFromTInvestApi } from "./get-price-from-tinvest-api.ts";

export async function getAssetFromTInvestApi(id: string): Promise<Asset> {
  const instrument = await tInvestApi.instruments
    .findInstrument({
      query: id,
      apiTradeAvailableFlag: true,
    })
    .then((v) => v.instruments[0]);

  if (!instrument) {
    throw new Error(`Unable to find instrument ${id}`);
  }

  return {
    id: instrument.uid,
    currentPrice: await getAssetPriceFromTInvestApi(instrument),
  };
}

export function getAssetsFromTInvestApi(ids: string[]) {
  return Promise.all(ids.map((id) => getAssetFromTInvestApi(id)));
}
