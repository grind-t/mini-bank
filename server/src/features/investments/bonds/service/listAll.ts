import { toRecord } from "@grind-t/toolkit";
import { withCache } from "#app/database/redis.ts";
import {
  getBondFinderReport,
  type BondFinderReportItem,
} from "../../integrations/bond-finder/report.ts";
import { getMoexBondsMarketYield } from "../../integrations/moex/getBondsMarketYield.ts";
import { Helpers, TinkoffInvestApi } from "tinkoff-invest-api";
import type { Bond } from "../model/bond.ts";
import { env } from "process";

export async function listAllBonds(): Promise<Bond[]> {
  return withCache("bonds_cache", "30m", async () => {
    const tInvestApi = new TinkoffInvestApi({
      token: env.T_INVEST_READONLY_TOKEN as string,
    });

    const [bonds, report, yields] = await Promise.all([
      tInvestApi.instruments.bonds({}).then((v) => v.instruments),
      getBondFinderReport().then((v) => toRecord(v, (v) => v.isin)),
      getMoexBondsMarketYield().then((v) => toRecord(v, (v) => v.SECID)),
    ]);

    return bonds
      .reduce((acc: Bond[], bond) => {
        const isin = bond.isin;
        const reportItem = report[isin] as BondFinderReportItem | undefined;
        const effectiveYield = yields[isin]?.EFFECTIVEYIELD || 0;
        const roundedEffectiveYield = Math.round(effectiveYield * 100) / 100;
        const bondYield = roundedEffectiveYield || reportItem?.close_yield;

        if (!bondYield) return acc;

        acc.push({
          isin,
          name: bond.name,
          maturityDate: bond.maturityDate,
          yield: bondYield,
          rating: {
            tInvest: bond.riskLevel < 1 ? undefined : 3 - bond.riskLevel,
            bondFinder: reportItem?.rating,
          },
          nominal: Helpers.toNumber(bond.nominal),
          currency: bond.currency,
          sector: bond.sector,
          isFloater: bond.floatingCouponFlag,
          hasAmortization: bond.amortizationFlag,
          hasOffer: !!bond.callDate || !!reportItem?.has_offer,
          forQual: bond.forQualInvestorFlag || !!reportItem?.qual,
        });

        return acc;
      }, [])
      .sort((a, b) => (b.yield || 0) - (a.yield || 0));
  });
}
