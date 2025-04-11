import type { InvestAccountShort } from "../model.ts";
import tInvestApi from "#features/investments/integrations/t-invest-api/core.ts";
import { mapTInvestAccount } from "../helpers/mapTInvestAccount.ts";

export async function getInvestAccountFromTInvestApi(
  accountId: string
): Promise<InvestAccountShort> {
  return mapTInvestAccount(
    await tInvestApi.operations.getPortfolio({ accountId })
  );
}
