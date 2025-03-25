import { booleanFilter } from "#src/features/filters/boolean.ts";
import { dateFilter } from "#src/features/filters/date.ts";
import { numberFilter } from "#src/features/filters/number.ts";
import { stringFilter } from "#src/features/filters/string.ts";
import type { z } from "zod";
import { listAllBonds } from "./listAll.ts";
import type { BondListFilterSchema } from "./list.schema.ts";

export type BondListFilter = z.infer<typeof BondListFilterSchema>;

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
        dateFilter(bond.maturityDate, filter.maturityDate) &&
        stringFilter(bond.currency, filter.currency) &&
        stringFilter(bond.sector, filter.sector) &&
        booleanFilter(bond.hasOffer, filter.hasOffer) &&
        booleanFilter(bond.forQual, filter.forQual))
  );
}
