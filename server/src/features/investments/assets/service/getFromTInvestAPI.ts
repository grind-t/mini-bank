import { InstrumentIdType } from "tinkoff-invest-api/cjs/generated/instruments.js";
import type { Asset } from "../model.ts";
import { InstrumentType } from "tinkoff-invest-api/cjs/generated/common.js";
import { Helpers } from "tinkoff-invest-api";
import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";

export function getAssetsFromTInvestApi(ids: string[]): Promise<Asset[]> {
  return Promise.all(
    ids.map(async (id) => {
      const instrument = (
        await tInvestApi.instruments.findInstrument({
          query: id,
          apiTradeAvailableFlag: true,
        })
      ).instruments[0];

      if (!instrument) {
        throw new Error(`Unable to find asset ${id}`);
      }

      const lastPricePromise = tInvestApi.marketData
        .getLastPrices({
          instrumentId: [instrument.uid],
        })
        .then((v) => {
          const price = v.lastPrices[0].price;

          if (!price) {
            throw new Error(`Failed to get price for asset ${id}`);
          }

          return Helpers.toNumber(price);
        });

      let assetPrice: number;

      if (instrument.instrumentKind === InstrumentType.INSTRUMENT_TYPE_BOND) {
        const bondResponse = await tInvestApi.instruments.bondBy({
          idType: InstrumentIdType.INSTRUMENT_ID_TYPE_UID,
          id: instrument.uid,
        });

        if (!bondResponse.instrument?.nominal) {
          throw new Error(`Failed to get bond for asset ${id}`);
        }

        const { nominal, aciValue } = bondResponse.instrument;

        assetPrice =
          ((await lastPricePromise) / 100) * Helpers.toNumber(nominal) +
          (Helpers.toNumber(aciValue) || 0);
      } else {
        throw new Error(
          `Unsupported instrumentKind ${instrument.instrumentKind}`
        );
      }

      return {
        id: instrument.uid,
        currentPrice: assetPrice,
      };
    })
  );
}
