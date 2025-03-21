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
  minSum?: number,
  maxSum?: number
): number {
  const minQuantity = Math.ceil((minSum || 0) / price);
  const maxQuantity = Math.floor(Math.min(balance, maxSum || Infinity) / price);

  if (minQuantity > maxQuantity) {
    throw new Error(
      `Invalid transfer constraints (balance: ${balance}, price: ${price}, minSum: ${minSum}, maxSum: ${maxSum})`
    );
  }

  return minSum ? minQuantity : maxQuantity;
}
