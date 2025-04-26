import { repoTransfer } from "#features/investments/integrations/t-invest-api/service/repo.ts";
import { OrderDirection } from "tinkoff-invest-api/cjs/generated/orders.js";
import { rebalanceInvestAccount } from "../../accounts/helpers/rebalance.ts";
import { getInvestAccountFromTInvestApi } from "../../accounts/service/getFromTInvestApi.ts";
import { getAssetsFromTInvestApi } from "../../assets/service/getFromTInvestApi.ts";
import { getDCAStrategyAssetsRatios } from "../helpers/getAssetsRatio.ts";
import type { DCAStrategy } from "../model/dcaStrategy.ts";
import { logDCAStrategy } from "./log.ts";
import { mergeAccountAssets } from "../../assets/helpers/mergeAccountAssets.ts";
import { setDCAStrategy } from "./set.ts";
import { getMoexTradingDays } from "../../integrations/moex/getTradingDays.ts";
import dayjs from "dayjs";
import { isNullish } from "@grind-t/toolkit/nullish";
import { sum } from "@grind-t/toolkit/array";
import { TRPCError } from "@trpc/server";
import { orderFromTInvestApi } from "../../orders/service/orderFromTInvestApi.ts";
import type { OrderedAsset } from "../../orders/model.ts";
import type { TInvestCtx } from "#features/investments/integrations/t-invest-api/model.ts";
import type { UserCtx } from "#features/app/auth/model.ts";

export async function executeDCAStrategy(
  strategy: DCAStrategy,
  accountId: string,
  ctx: UserCtx & TInvestCtx
) {
  const accountPromise = getInvestAccountFromTInvestApi(accountId, ctx);
  const assetsPromise = getAssetsFromTInvestApi(
    strategy.assets.map((v) => v.isin),
    ctx
  );
  const budgetPromise = getMoexTradingDays(
    dayjs(),
    dayjs().endOf("month")
  ).then(async (tradingDays) => {
    const budget = strategy.currentMonthBudget / tradingDays;

    await repoTransfer(
      {
        accountId,
        direction: OrderDirection.ORDER_DIRECTION_SELL,
        minSum: budget,
      },
      ctx
    );

    return budget;
  });

  const [account, assets, budget] = await Promise.all([
    accountPromise,
    assetsPromise,
    budgetPromise,
  ]);

  const initialAssets = mergeAccountAssets(
    assets.filter((v) => !isNullish(v)),
    account.assets
  );

  const targetRatios = getDCAStrategyAssetsRatios(strategy.assets);
  const rebalancedAssets = rebalanceInvestAccount(
    initialAssets,
    targetRatios,
    budget
  );

  const orderPromises: Promise<OrderedAsset>[] = initialAssets.reduce(
    (acc: Promise<OrderedAsset>[], _, i) => {
      const initialAsset = initialAssets[i];
      const rebalancedAsset = rebalancedAssets[i];
      const diff = rebalancedAsset.quantity - initialAsset.quantity;

      if (diff > 0) {
        acc.push(
          orderFromTInvestApi(
            {
              accountId,
              asset: initialAsset,
              quantity: diff,
            },
            ctx
          )
        );
      }

      return acc;
    },
    []
  );

  const orderedAssets = await Promise.all(orderPromises);
  const spent = sum(orderedAssets, (v) => v.currentPrice * v.quantity);

  repoTransfer(
    {
      accountId,
      direction: OrderDirection.ORDER_DIRECTION_BUY,
    },
    ctx
  );

  setDCAStrategy(
    {
      id: strategy.id,
      assets: strategy.assets.filter((_, i) => !isNullish(assets[i])),
      currentMonthBudget: strategy.currentMonthBudget - spent,
    },
    ctx
  );

  logDCAStrategy({
    userId: ctx.user.id,
    strategy,
    initialAssets,
    budget,
    rebalancedAssets,
    orderedAssets,
  });

  if (orderedAssets.some((v) => v.error)) {
    throw new TRPCError({
      message: "Some orders failed, see logs",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
