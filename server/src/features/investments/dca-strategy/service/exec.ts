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
import { sum, splitSettled } from "@grind-t/toolkit";
import { TRPCError } from "@trpc/server";

export async function executeDCAStrategy(
  strategy: DCAStrategy,
  accountId: string
) {
  const assetsPromise = Promise.all([
    getInvestAccountFromTInvestApi(accountId),
    getAssetsFromTInvestApi(strategy.assets.map((v) => v.id)),
  ]).then(([account, assets]) => mergeAccountAssets(assets, account.assets));

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

  const [assets, budget] = await Promise.all([assetsPromise, budgetPromise]);
  const targetRatios = getDCAStrategyAssetsRatios(strategy.assets);
  const rebalancedAssets = rebalanceInvestAccount(assets, targetRatios, budget);
  const orders: Promise<PostOrderResponse>[] = [];

  for (let i = 0; i < assets.length; i++) {
    const quantity = rebalancedAssets[i].quantity - assets[i].quantity;

    if (quantity > 0) {
      orders.push(
        tInvestApi.orders
          .postOrder({
            quantity,
            direction: OrderDirection.ORDER_DIRECTION_BUY,
            accountId,
            orderType: OrderType.ORDER_TYPE_MARKET,
            orderId: crypto.randomUUID(),
            instrumentId: assets[i].id,
            timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
            priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
          })
          .catch((e) => {
            const msg = `${strategy.assets[i].id} ${assets[i].id} ${e?.message}`;
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
    ...strategy,
    currentMonthBudget: strategy.currentMonthBudget - spent,
  });

  logDCAStrategy({
    strategy,
    initialAssets: assets,
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
