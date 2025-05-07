export const tInvestBondRatings = {
  0: "T-C",
  1: "T-B",
  2: "T-A",
};

export type TInvestBondRatingValue = keyof typeof tInvestBondRatings;
export type TInvestBondRatingLabel =
  (typeof tInvestBondRatings)[TInvestBondRatingValue];

export function getTInvestBondRatingText(rating: number): string {
  return tInvestBondRatings[rating as TInvestBondRatingValue] ?? "T-U";
}
