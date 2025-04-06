import {
  type InstrumentShort,
  InstrumentIdType,
} from "tinkoff-invest-api/cjs/generated/instruments.js";
import tInvestApi from "../../integrations/t-invest-api/core.ts";
import { InstrumentType } from "tinkoff-invest-api/cjs/generated/common.js";
import { getBondPrice } from "../../integrations/t-invest-api/helpers/bond-price.ts";
import dayjs from "dayjs";
import { isNullish } from "@grind-t/toolkit";
import { Helpers } from "tinkoff-invest-api";

export async function getAssetPriceFromTInvestApi(
  instrument: InstrumentShort
): Promise<number | null> {
  const marketPricePromise = tInvestApi.marketData
    .getLastPrices({
      instrumentId: [instrument.uid],
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
