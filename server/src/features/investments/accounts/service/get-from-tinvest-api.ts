import { Helpers } from "tinkoff-invest-api";
import type { InvestAccount } from "../model.ts";
import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";
import type { PortfolioResponse } from "tinkoff-invest-api/cjs/generated/operations.js";

export function mapTInvestAPIPortfolio({
  accountId,
  positions,
}: PortfolioResponse) {
  return {
    id: accountId,
    assets: positions.map((position) => ({
      id: position.instrumentUid,
      quantity: Helpers.toNumber(position.quantity) || 0,
      currentPrice: Helpers.toNumber(position.currentPrice) || 0,
      averagePrice: Helpers.toNumber(position.averagePositionPrice) || 0,
    })),
  };
}

export async function getInvestAccountFromTInvestAPI(
  accountId: string
): Promise<InvestAccount> {
  return mapTInvestAPIPortfolio(
    await tInvestApi.operations.getPortfolio({ accountId })
  );
}
