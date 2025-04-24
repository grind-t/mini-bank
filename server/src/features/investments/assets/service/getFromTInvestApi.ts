import type { Asset } from "../model.ts";
import { getAssetPriceFromTInvestApi } from "./getPriceFromTInvestApi.ts";
import { isNullish } from "@grind-t/toolkit";
import type { TInvestCtx } from "#features/investments/integrations/t-invest-api/model.ts";

export async function getAssetFromTInvestApi(
  id: string,
  ctx: TInvestCtx
): Promise<Asset | null> {
  const { tInvestApi } = ctx;

  const instrument = await tInvestApi.instruments
    .findInstrument({
      query: id,
      apiTradeAvailableFlag: true,
    })
    .then((v) => v.instruments[0]);

  if (isNullish(instrument)) {
    return null;
  }

  const currentPrice = await getAssetPriceFromTInvestApi(instrument, ctx);

  if (isNullish(currentPrice)) {
    return null;
  }

  return {
    id: instrument.uid,
    isin: instrument.isin,
    name: instrument.name,
    currentPrice,
  };
}

export function getAssetsFromTInvestApi(ids: string[], ctx: TInvestCtx) {
  return Promise.all(ids.map((id) => getAssetFromTInvestApi(id, ctx)));
}
