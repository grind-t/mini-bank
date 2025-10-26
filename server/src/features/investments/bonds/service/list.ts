import { booleanFilter } from "#features/filters/boolean.ts";
import { dateFilter } from "#features/filters/date.ts";
import { numberFilter } from "#features/filters/number.ts";
import { stringFilter } from "#features/filters/string.ts";
import type { BondListFilter } from "../model/bondListFilter.ts";
import { listAllBonds } from "./listAll.ts";

export async function listBonds(filter?: BondListFilter) {
  const allBonds = await listAllBonds();

  if (!filter) return allBonds;

  return allBonds.filter(
    (bond) =>
      filter.whitelist?.includes(bond.isin) ||
      (!filter.blacklist?.includes(bond.isin) &&
        numberFilter(bond.ytm, filter.ytm) &&
        numberFilter(bond.eytm, filter.eytm) &&
        numberFilter(bond.rating.tInvest, filter.rating?.tInvest) &&
        numberFilter(bond.rating.AKRA, filter.rating?.AKRA) &&
        numberFilter(bond.rating.NKR, filter.rating?.NKR) &&
        numberFilter(bond.rating.EXPERT_RA, filter.rating?.EXPERT_RA) &&
        numberFilter(bond.rating.NRA, filter.rating?.NRA) &&
        numberFilter(bond.nominal, filter.nominal) &&
        dateFilter(bond.maturityDate, filter.maturityDate) &&
        stringFilter(bond.currency, filter.currency) &&
        stringFilter(bond.sector, filter.sector) &&
        booleanFilter(bond.hasAmortization, filter.hasAmortization) &&
        booleanFilter(bond.hasOffer, filter.hasOffer) &&
        booleanFilter(bond.forQual, filter.forQual))
  );
}
