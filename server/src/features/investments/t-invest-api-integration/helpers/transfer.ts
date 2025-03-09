import { Helpers } from "tinkoff-invest-api";
import type { MoneyValue } from "tinkoff-invest-api/cjs/generated/common.js";
import type { PositionsSecurities } from "tinkoff-invest-api/cjs/generated/operations.js";

export function getCurrencyBalance(money: MoneyValue[], currency: "rub") {
  return (
    Helpers.toNumber(
      money.find((v) => v.currency.toLowerCase() === currency)
    ) || 0
  );
}

export function getPositionBalance(
  positions: PositionsSecurities[],
  id: string,
  price: number
) {
  return (positions.find((v) => v.instrumentUid === id)?.balance || 0) * price;
}

export function getTransferQuantity(
  balance: number,
  price: number,
  minSum = 0,
  maxSum = Infinity
): number {
  const minQuantity = Math.ceil(minSum / price);
  const maxQuantity = Math.floor(Math.min(balance, maxSum) / price);
  const actualMinSum = minQuantity * price;

  if (balance < actualMinSum) {
    throw new Error(
      `Not enough money for transfer (balance: ${balance}, minSum: ${actualMinSum})`
    );
  }

  return maxQuantity;
}
