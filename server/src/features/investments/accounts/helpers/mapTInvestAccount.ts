import type { PortfolioResponse } from "tinkoff-invest-api/cjs/generated/operations.js";
import type { InvestAccountShort } from "../model.ts";
import { Helpers } from "tinkoff-invest-api";

export function mapTInvestAccount({
  accountId,
  positions,
}: PortfolioResponse): InvestAccountShort {
  return {
    id: accountId,
    assets: positions.map((position) => ({
      id: position.instrumentUid,
      quantity: Helpers.toNumber(position.quantity) || 0,
      averagePrice: Helpers.toNumber(position.averagePositionPrice) || 0,
    })),
  };
}
