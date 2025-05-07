export const bondFinderRatings = {
  6: "AAA",
  5.1: "AA+",
  5: "AA",
  4.9: "AA-",
  4.1: "A+",
  4: "A",
  3.9: "A-",
  3.1: "BBB+",
  3: "BBB",
  2.9: "BBB-",
  2.1: "BB+",
  2: "BB",
  1.9: "BB-",
  1.1: "B+",
  1: "B",
  0.9: "B-",
} as const;

export type BondFinderRatingValue = keyof typeof bondFinderRatings;
export type BondFinderRatingLabel =
  (typeof bondFinderRatings)[BondFinderRatingValue];

export function getBondFinderRatingText(rating: number): string {
  return bondFinderRatings[rating as BondFinderRatingValue] ?? "U";
}
