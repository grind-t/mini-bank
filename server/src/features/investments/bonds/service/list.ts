import { toRecord } from "#src/features/toolkit/toRecord.ts";
import { redis } from "#src/redis.ts";
import { getMoexBondMarketYield } from "../../moex-integration/getBondMarketYield.ts";

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

  const bondFinderResponse = await fetch(
    "https://raw.githubusercontent.com/bond-finder-lab/backend/refs/heads/master/docs/report-v1.json"
  );

  const data = (await bondFinderResponse.json()) as {
    date: string;
    cols: string[];
    rows: any[][];
  };

  const indicies = toRecord(data.cols);

  const bonds = data.rows.reduce((acc: Bond[], row) => {
    const isRub = row[indicies["rub"]];
    const highRisk = row[indicies["high_risk"]];
    const hasOffer = row[indicies["has_offer"]];
    const isQual = row[indicies["qual"]];

    if (isRub && !highRisk && !hasOffer && !isQual) {
      acc.push({
        isin: row[indicies["isin"]],
        name: row[indicies["name"]],
        maturityDate: new Date(row[indicies["maturity_date"]]),
        yield: row[indicies["close_yield"]],
        rating: row[indicies["rating"]],
      });
    }

    return acc;
  }, []);

  const correctedBonds = bonds.map(async (v) => {
    const marketYield = (await getMoexBondMarketYield(v.isin))?.EFFECTIVEYIELD;

    if (marketYield) {
      v.yield = Math.round(marketYield * 100) / 100;
    }

    return v;
  });

  const response = (await Promise.all(correctedBonds)).sort(
    (a, b) => (b.yield || 0) - (a.yield || 0)
  );

  redis.set(cacheKey, JSON.stringify(response), "EX", 21600);

  return response;
}
