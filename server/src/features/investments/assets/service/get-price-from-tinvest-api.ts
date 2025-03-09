import {
  type InstrumentShort,
  InstrumentIdType,
} from "tinkoff-invest-api/cjs/generated/instruments.js";
import tInvestApi from "../../t-invest-api-integration/core.ts";
import { InstrumentType } from "tinkoff-invest-api/cjs/generated/common.js";
import { getBondPrice } from "../../t-invest-api-integration/helpers/bond-price.ts";

export async function getAssetPriceFromTInvestApi(instrument: InstrumentShort) {
  const pricePromise = tInvestApi.marketData
    .getLastPrices({
      instrumentId: [instrument.uid],
    })
    .then(({ lastPrices }) => {
      if (!lastPrices[0]?.price) {
        throw new Error(
          `Failed to get last price for instrument ${instrument.uid}`
        );
      }

      return lastPrices[0].price;
    });

  if (instrument.instrumentKind === InstrumentType.INSTRUMENT_TYPE_BOND) {
    const bond = await tInvestApi.instruments
      .bondBy({
        idType: InstrumentIdType.INSTRUMENT_ID_TYPE_UID,
        id: instrument.uid,
      })
      .then((v) => v.instrument);

    if (!bond) {
      throw new Error(`Failed to get bond for instrument ${instrument.uid}`);
    }

    return getBondPrice(await pricePromise, bond);
  } else {
    throw new Error(`Unsupported instrumentKind ${instrument.instrumentKind}`);
  }
}
