import type { InvestAccountShort } from "../model.ts";
import { mapTInvestAccount } from "../helpers/mapTInvestAccount.ts";
import type { TInvestCtx } from "#features/investments/integrations/t-invest-api/model.ts";

export async function getInvestAccountFromTInvestApi(
  accountId: string,
  ctx: TInvestCtx
): Promise<InvestAccountShort> {
  const { tInvestApi } = ctx;

  return mapTInvestAccount(
    await tInvestApi.operations.getPortfolio({ accountId })
  );
}
