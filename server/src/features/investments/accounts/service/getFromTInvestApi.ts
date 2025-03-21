import type { InvestAccount } from "../model.ts";
import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";
import { mapTInvestAccount } from "../helpers/mapTInvestAccount.ts";

export async function getInvestAccountFromTInvestApi(
  accountId: string
): Promise<InvestAccount> {
  return mapTInvestAccount(
    await tInvestApi.operations.getPortfolio({ accountId })
  );
}
