import { Helpers } from "tinkoff-invest-api";
import { getPortfolio } from "../../../common/integrations/t-invest-api.ts";
import type { InvestAccount } from "../model.ts";

export async function getInvestAccountFromTInvestAPI(
  accountId: string
): Promise<InvestAccount> {
  const portfolio = await getPortfolio({ accountId });

  return {
    id: portfolio.accountId,
    assets: portfolio.positions.map((position) => ({
      id: position.instrumentUid,
      quantity: Helpers.toNumber(position.quantity) || 0,
      currentPrice: Helpers.toNumber(position.currentPrice) || 0,
      averagePrice: Helpers.toNumber(position.averagePositionPrice) || 0,
    })),
  };
}
