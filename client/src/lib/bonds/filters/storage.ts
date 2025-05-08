import type { BondListFilter } from "$lib/trpc";
import dayjs from "dayjs";
import SuperJSON from "superjson";

const key = "bond_list_filter";

export function getBondListFilter(): BondListFilter {
  const storageValue = localStorage.getItem(key);

  if (storageValue) {
    return SuperJSON.parse(storageValue);
  }

  return {
    yield: {
      gte: 22,
      lte: 32,
    },
    rating: {
      tInvest: {
        gte: 2,
      },
      bondFinder: {
        gte: 3.9,
      },
    },
    nominal: {
      lte: 10000,
    },
    maturityDate: {
      lte: dayjs().add(2, "years").toDate(),
      gte: dayjs().add(1, "month").toDate(),
      unit: "day",
    },
    currency: {
      in: ["rub"],
    },
    sector: {
      nin: ["real_estate"],
    },
    hasAmortization: { eq: false },
    hasOffer: { eq: false },
    forQual: { eq: false },
  };
}

export function setBondListFilter(value: BondListFilter): void {
  localStorage.setItem(key, SuperJSON.stringify(value));
}
