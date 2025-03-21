import { Helpers } from "tinkoff-invest-api";
import type { Quotation } from "tinkoff-invest-api/cjs/generated/common.js";
import type { Bond } from "tinkoff-invest-api/cjs/generated/instruments.js";

export function getBondPrice(price: Quotation, bond: Bond) {
  return (
    (Helpers.toNumber(price) / 100) * (Helpers.toNumber(bond.nominal) || 0) +
    (Helpers.toNumber(bond.aciValue) || 0)
  );
}
