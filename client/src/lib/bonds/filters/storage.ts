import type { BondListFilter } from "$lib/trpc";
import { ratingScale } from "@grind-t/cbr-ratings";
import dayjs from "dayjs";
import SuperJSON from "superjson";

const key = "bond_list_filter";

export function getBondListFilter(): BondListFilter {
  const storageValue = localStorage.getItem(key);

  if (storageValue) {
    return SuperJSON.parse(storageValue);
  }

  return {
    ytm: {
      gte: 17,
      lte: 27,
    },
    rating: {
      tInvest: {
        gte: 2,
      },
      AKRA: {
        gte: ratingScale.indexOf("A-"),
      },
      NKR: {
        gte: ratingScale.indexOf("A-"),
      },
    },
    nominal: {
      lte: 10000,
    },
    maturityDate: {
      lte: dayjs().add(2, "years").add(6, "months").toDate(),
      gte: dayjs().add(1, "month").toDate(),
      unit: "day",
    },
    currency: {
      in: ["rub"],
    },
    hasAmortization: { eq: false },
    hasOffer: { eq: false },
    forQual: { eq: false },
  };
}

export function setBondListFilter(value: BondListFilter): void {
  localStorage.setItem(key, SuperJSON.stringify(value));
}
