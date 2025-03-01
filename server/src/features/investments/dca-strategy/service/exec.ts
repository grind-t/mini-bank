import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";
import { transferFromREPO } from "#features/investments/t-invest-api-integration/service/repo.ts";
import { getCurrentMonthTradingDays } from "#features/investments/t-invest-api-integration/service/trading-days.ts";
import {
  OrderDirection,
  OrderType,
  TimeInForceType,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import { rebalanceInvestAccount } from "../../accounts/helpers/rebalance.ts";
import type { InvestAccountAsset } from "../../accounts/model.ts";
import { getInvestAccountFromTInvestAPI } from "../../accounts/service/getFromTInvestAPI.ts";
import { getAssetsFromTInvestApi } from "../../assets/service/getFromTInvestAPI.ts";
import { getDCAStrategyAssetsRatios } from "../helpers/getAssetsRatio.ts";
import type { DCAStrategy } from "../model.ts";
import { PriceType } from "tinkoff-invest-api/cjs/generated/common.js";
import { logDCAStrategy } from "./log.ts";

export async function executeDCAStrategy(
  strategy: DCAStrategy,
  accountId: string
) {
  const assetsPromise = Promise.all([
    getInvestAccountFromTInvestAPI(accountId),
    getAssetsFromTInvestApi(strategy.assets.map((v) => v.id)),
  ]).then(([account, assets]) => {
    const accountAssets = account.assets.reduce((record, asset) => {
      record[asset.id] = asset;
      return record;
    }, {} as Record<string, InvestAccountAsset | undefined>);

    return assets.map<InvestAccountAsset>((asset) => {
      const accountAsset = accountAssets[asset.id];

      return {
        id: asset.id,
        quantity: accountAsset?.quantity || 0,
        currentPrice: asset.currentPrice,
        averagePrice: accountAsset?.averagePrice || 0,
      };
    });
  });

  const budgetPromise = getCurrentMonthTradingDays().then(
    async (tradingDays) => {
      const budget = strategy.currentMonthBudget / tradingDays;
      await transferFromREPO(accountId, budget);

      return budget;
    }
  );

  const [assets, budget] = await Promise.all([assetsPromise, budgetPromise]);
  const targetRatios = getDCAStrategyAssetsRatios(strategy.assets);
  const rebalancedAssets = rebalanceInvestAccount(assets, targetRatios, budget);

  for (let i = 0; i < assets.length; i++) {
    const quantity = rebalancedAssets[i].quantity - assets[i].quantity;

    if (quantity > 0) {
      tInvestApi.orders.postOrder({
        quantity,
        direction: OrderDirection.ORDER_DIRECTION_BUY,
        accountId,
        orderType: OrderType.ORDER_TYPE_MARKET,
        orderId: crypto.randomUUID(),
        instrumentId: assets[i].id,
        timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
        priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
      });
    }
  }

  logDCAStrategy({
    strategy,
    initialAssets: assets,
    budget,
    rebalancedAssets,
  });
}
