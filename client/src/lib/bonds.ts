export function getBondRatingText(rating: number) {
  switch (rating) {
    case 6:
      return "AAA";
    case 5.1:
      return "AA+";
    case 5:
      return "AA";
    case 4.9:
      return "AA-";
    case 4.1:
      return "A+";
    case 4:
      return "A";
    case 3.9:
      return "A-";
    case 3.1:
      return "BBB+";
    case 3:
      return "BBB";
    case 2.9:
      return "BBB-";
    case 2.1:
      return "BB+";
    case 2:
      return "BB";
    case 1.9:
      return "BB-";
    case 1.1:
      return "B+";
    case 1:
      return "B";
    case 0.9:
      return "B-";
    case 0:
      return "N/A";
    default:
      return "wtf";
  }
}
