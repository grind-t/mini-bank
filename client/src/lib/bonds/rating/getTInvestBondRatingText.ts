export function getTInvestBondRatingText(rating: number): string {
  switch (rating) {
    case 0:
      return "T-C";
    case 1:
      return "T-B";
    case 2:
      return "T-A";
    default:
      return "T-U";
  }
}
