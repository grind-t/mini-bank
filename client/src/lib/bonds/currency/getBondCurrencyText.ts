export function getBondCurrencyText(value: string) {
  switch (value) {
    case "rub":
      return "₽";
    case "usd":
      return "$";
    case "cny":
      return "¥";
    default:
      return value;
  }
}
