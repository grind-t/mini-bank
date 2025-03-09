import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";
import { repoTransfer } from "#features/investments/t-invest-api-integration/service/repo.ts";
import { getCurrentMonthTradingDays } from "#features/investments/t-invest-api-integration/service/trading-days.ts";
import {
  OrderDirection,
  OrderType,
  PostOrderResponse,
  TimeInForceType,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import { rebalanceInvestAccount } from "../../accounts/helpers/rebalance.ts";
import { getInvestAccountFromTInvestAPI } from "../../accounts/service/get-from-tinvest-api.ts";
import { getAssetsFromTInvestApi } from "../../assets/service/get-from-tinvest-api.ts";
import { getDCAStrategyAssetsRatios } from "../helpers/getAssetsRatio.ts";
import type { DCAStrategy } from "../model/dca-strategy.ts";
import { PriceType } from "tinkoff-invest-api/cjs/generated/common.js";
import { logDCAStrategy } from "./log.ts";
import { mergeAccountAssets } from "../../assets/helpers/merge-account-assets.ts";
import { Helpers } from "tinkoff-invest-api";
import { setDCAStrategy } from "./set.ts";

export async function executeDCAStrategy(
  strategy: DCAStrategy,
  accountId: string
) {
  const assetsPromise = Promise.all([
    getInvestAccountFromTInvestAPI(accountId),
    getAssetsFromTInvestApi(strategy.assets.map((v) => v.id)),
  ]).then(([account, assets]) => mergeAccountAssets(assets, account.assets));

  const budgetPromise = getCurrentMonthTradingDays().then(
    async (tradingDays) => {
      const budget = strategy.currentMonthBudget / tradingDays;

      await repoTransfer({
        accountId,
        direction: OrderDirection.ORDER_DIRECTION_SELL,
        minSum: budget,
      });

      return budget;
    }
  );

  const [assets, budget] = await Promise.all([assetsPromise, budgetPromise]);
  const targetRatios = getDCAStrategyAssetsRatios(strategy.assets);
  const rebalancedAssets = rebalanceInvestAccount(assets, targetRatios, budget);
  const orders: Promise<PostOrderResponse>[] = [];

  for (let i = 0; i < assets.length; i++) {
    const quantity = rebalancedAssets[i].quantity - assets[i].quantity;

    if (quantity > 0) {
      orders.push(
        tInvestApi.orders.postOrder({
          quantity,
          direction: OrderDirection.ORDER_DIRECTION_BUY,
          accountId,
          orderType: OrderType.ORDER_TYPE_MARKET,
          orderId: crypto.randomUUID(),
          instrumentId: assets[i].id,
          timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
          priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
        })
      );
    }
  }

  const results = await Promise.all(orders);

  const spent = results.reduce(
    (acc, v) => acc + (Helpers.toNumber(v.totalOrderAmount) || 0),
    0
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
    orderIds: results.map((v) => v.orderId),
  });
}
