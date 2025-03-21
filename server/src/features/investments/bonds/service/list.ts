import { toRecord } from "#src/features/toolkit/toRecord.ts";
import { cacheHours, withCache } from "#src/redis.ts";
import { getBondFinderReport } from "../../integrations/bond-finder/report.ts";
import { getMoexBondsMarketYield } from "../../integrations/moex/getBondsMarketYield.ts";

export type Bond = {
  isin: string;
  name: string;
  maturityDate: Date;
  yield: number;
  rating: number;
};

export async function listBonds(): Promise<Bond[]> {
  return withCache("bonds_cache", cacheHours(6), async () => {
    const [bondFinder, marketYields] = await Promise.all([
      getBondFinderReport(),
      getMoexBondsMarketYield().then((v) => toRecord(v, (v) => v.SECID)),
    ]);

    return bondFinder
      .reduce((acc: Bond[], item) => {
        const isRub = item.rub;
        const highRisk = item.high_risk;
        const hasOffer = item.has_offer;
        const isQual = item.qual;

        if (isRub && !highRisk && !hasOffer && !isQual) {
          const isin = item.isin;
          const effectiveYield = marketYields[isin]?.EFFECTIVEYIELD || 0;
          const roundedEffectiveYield = Math.round(effectiveYield * 100) / 100;

          acc.push({
            isin,
            name: item.name,
            maturityDate: new Date(item.maturity_date),
            yield: roundedEffectiveYield || item.close_yield,
            rating: item.rating,
          });
        }

        return acc;
      }, [])
      .sort((a, b) => (b.yield || 0) - (a.yield || 0));
  });
}
