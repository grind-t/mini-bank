import { toRecord } from "#src/features/toolkit/toRecord.ts";
import { redis } from "#src/redis.ts";
import { getMoexBondsMarketYield } from "../../integrations/moex/getBondsMarketYield.ts";

export type Bond = {
  isin: string;
  name: string;
  maturityDate: Date;
  yield: number;
  rating: number;
};

const cacheKey = "bonds_cache";

export async function listBonds(): Promise<Bond[]> {
  const cachedResponse = await redis.get(cacheKey);

  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }

  const [bondFinder, marketYields] = await Promise.all([
    fetch(
      "https://raw.githubusercontent.com/bond-finder-lab/backend/refs/heads/master/docs/report-v1.json"
    ).then(
      (v) =>
        v.json() as Promise<{
          date: string;
          cols: string[];
          rows: any[][];
        }>
    ),
    getMoexBondsMarketYield().then((v) => toRecord(v, (v) => v.SECID)),
  ]);

  const indicies = toRecord(bondFinder.cols);

  const bonds = bondFinder.rows
    .reduce((acc: Bond[], row) => {
      const isRub = row[indicies["rub"]];
      const highRisk = row[indicies["high_risk"]];
      const hasOffer = row[indicies["has_offer"]];
      const isQual = row[indicies["qual"]];

      if (isRub && !highRisk && !hasOffer && !isQual) {
        const isin = row[indicies["isin"]];
        const effectiveYield = marketYields[isin]?.EFFECTIVEYIELD || 0;
        const roundedEffectiveYield = Math.round(effectiveYield * 100) / 100;

        acc.push({
          isin: row[indicies["isin"]],
          name: row[indicies["name"]],
          maturityDate: new Date(row[indicies["maturity_date"]]),
          yield: roundedEffectiveYield || row[indicies["close_yield"]],
          rating: row[indicies["rating"]],
        });
      }

      return acc;
    }, [])
    .sort((a, b) => (b.yield || 0) - (a.yield || 0));

  redis.set(cacheKey, JSON.stringify(bonds), "EX", 21600);
  return bonds;
}
