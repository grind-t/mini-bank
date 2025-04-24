import {
  type InstrumentShort,
  InstrumentIdType,
} from "tinkoff-invest-api/cjs/generated/instruments.js";
import { InstrumentType } from "tinkoff-invest-api/cjs/generated/common.js";
import { getBondPrice } from "../../integrations/t-invest-api/helpers/bond-price.ts";
import { isNullish } from "@grind-t/toolkit";
import { Helpers } from "tinkoff-invest-api";
import { LastPriceType } from "tinkoff-invest-api/cjs/generated/marketdata.js";
import type { TInvestCtx } from "#features/investments/integrations/t-invest-api/model.ts";

export async function getAssetPriceFromTInvestApi(
  instrument: InstrumentShort,
  ctx: TInvestCtx
): Promise<number | null> {
  const { tInvestApi } = ctx;

  const marketPricePromise = tInvestApi.marketdata
    .getLastPrices({
      instrumentId: [instrument.uid],
      figi: [],
      lastPriceType: LastPriceType.LAST_PRICE_UNSPECIFIED,
    })
    .then(({ lastPrices }) => lastPrices[0]?.price);

  if (instrument.instrumentKind === InstrumentType.INSTRUMENT_TYPE_BOND) {
    const bond = await tInvestApi.instruments
      .bondBy({
        idType: InstrumentIdType.INSTRUMENT_ID_TYPE_UID,
        id: instrument.uid,
      })
      .then((v) => v.instrument);

    if (isNullish(bond) || Helpers.toNumber(bond.nominal) === 0) {
      return null;
    }

    const marketPrice = await marketPricePromise;

    if (isNullish(marketPrice)) {
      return null;
    }

    return getBondPrice(marketPrice, bond);
  } else {
    throw new Error(`Unsupported instrumentKind ${instrument.instrumentKind}`);
  }
}
