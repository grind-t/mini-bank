import { toRecord } from "#src/features/toolkit/toRecord.ts";
import { cacheHours, withCache } from "#src/redis.ts";
import { getBondFinderReport } from "../../integrations/bond-finder/report.ts";
import { getMoexBondsMarketYield } from "../../integrations/moex/getBondsMarketYield.ts";
import tInvestApi from "../../integrations/t-invest-api/core.ts";

export type Bond = {
  isin: string;
  name: string;
  maturityDate: Date;
  yield: number;
  rating: number;
};

export async function listBonds(): Promise<Bond[]> {
  return withCache("bonds_cache", cacheHours(6), async () => {
    const [report, bonds, yields] = await Promise.all([
      getBondFinderReport(),
      tInvestApi.instruments
        .bonds({})
        .then((v) => toRecord(v.instruments, (v) => v.isin)),
      getMoexBondsMarketYield().then((v) => toRecord(v, (v) => v.SECID)),
    ]);

    return report
      .reduce((acc: Bond[], item) => {
        const bond = bonds[item.isin];
        const isRub = item.rub;
        const highRisk = item.high_risk;
        const hasOffer = item.has_offer;
        const isQual = item.qual || bond?.forQualInvestorFlag;

        if (isRub && !highRisk && !hasOffer && !isQual) {
          const isin = item.isin;
          const effectiveYield = yields[isin]?.EFFECTIVEYIELD || 0;
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
