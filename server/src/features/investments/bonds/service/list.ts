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
        numberFilter(bond.yield, filter.yield) &&
        numberFilter(bond.rating.tInvest, filter.rating?.tInvest) &&
        numberFilter(bond.rating.bondFinder, filter.rating?.bondFinder) &&
        numberFilter(bond.nominal, filter.nominal) &&
        dateFilter(bond.maturityDate, filter.maturityDate) &&
        stringFilter(bond.currency, filter.currency) &&
        stringFilter(bond.sector, filter.sector) &&
        booleanFilter(bond.hasAmortization, filter.hasAmortization) &&
        booleanFilter(bond.hasOffer, filter.hasOffer) &&
        booleanFilter(bond.forQual, filter.forQual))
  );
}
