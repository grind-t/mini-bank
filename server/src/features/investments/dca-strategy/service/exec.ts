import tInvestApi from "#features/investments/integrations/t-invest-api/core.ts";
import { repoTransfer } from "#features/investments/integrations/t-invest-api/service/repo.ts";
import {
  OrderDirection,
  OrderType,
  PostOrderResponse,
  TimeInForceType,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import { rebalanceInvestAccount } from "../../accounts/helpers/rebalance.ts";
import { getInvestAccountFromTInvestApi } from "../../accounts/service/getFromTInvestApi.ts";
import { getAssetsFromTInvestApi } from "../../assets/service/getFromTInvestApi.ts";
import { getDCAStrategyAssetsRatios } from "../helpers/getAssetsRatio.ts";
import type { DCAStrategy } from "../model/dcaStrategy.ts";
import { PriceType } from "tinkoff-invest-api/cjs/generated/common.js";
import { logDCAStrategy } from "./log.ts";
import { mergeAccountAssets } from "../../assets/helpers/mergeAccountAssets.ts";
import { Helpers } from "tinkoff-invest-api";
import { setDCAStrategy } from "./set.ts";
import { getMoexTradingDays } from "../../integrations/moex/getTradingDays.ts";
import dayjs from "dayjs";
import { sum, splitSettled, isNullish } from "@grind-t/toolkit";
import { TRPCError } from "@trpc/server";

export async function executeDCAStrategy(
  strategy: DCAStrategy,
  accountId: string
) {
  const accountPromise = getInvestAccountFromTInvestApi(accountId);

  const assetsPromise = getAssetsFromTInvestApi(
    strategy.assets.map((v) => v.id)
  );

  const budgetPromise = getMoexTradingDays(
    dayjs(),
    dayjs().endOf("month")
  ).then(async (tradingDays) => {
    const budget = strategy.currentMonthBudget / tradingDays;

    await repoTransfer({
      accountId,
      direction: OrderDirection.ORDER_DIRECTION_SELL,
      minSum: budget,
    });

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

  const orders: Promise<PostOrderResponse>[] = [];

  for (let i = 0; i < initialAssets.length; i++) {
    const quantity = rebalancedAssets[i].quantity - initialAssets[i].quantity;

    if (quantity > 0) {
      orders.push(
        tInvestApi.orders
          .postOrder({
            quantity,
            direction: OrderDirection.ORDER_DIRECTION_BUY,
            accountId,
            orderType: OrderType.ORDER_TYPE_MARKET,
            orderId: crypto.randomUUID(),
            instrumentId: initialAssets[i].id,
            timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
            priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
          })
          .catch((e) => {
            const msg = `${strategy.assets[i].id} ${initialAssets[i].id} ${e?.message}`;
            throw new Error(msg);
          })
      );
    }
  }

  const [fulfilledOrders, rejectedOrders] = await splitSettled(orders);

  const spent = sum(
    fulfilledOrders,
    (v) => Helpers.toNumber(v.totalOrderAmount) || 0
  );

  repoTransfer({ accountId, direction: OrderDirection.ORDER_DIRECTION_BUY });

  setDCAStrategy({
    id: strategy.id,
    assets: strategy.assets.filter((_, i) => !isNullish(assets[i])),
    currentMonthBudget: strategy.currentMonthBudget - spent,
  });

  logDCAStrategy({
    strategy,
    initialAssets,
    budget,
    spent,
    rebalancedAssets,
    orderIds: fulfilledOrders.map((v) => v.orderId),
    orderErrors: rejectedOrders.map((v) => v?.message),
  });

  if (rejectedOrders.length) {
    throw new TRPCError({
      message: "Some orders failed, see logs",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
