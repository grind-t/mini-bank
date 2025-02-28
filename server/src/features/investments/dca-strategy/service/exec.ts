import { getCurrentMonthTradingDays } from "#features/investments/t-invest-api-integration/service/getCurrentMonthTradingDays.ts";
import { rebalanceInvestAccount } from "../../accounts/helpers/rebalance.ts";
import type { InvestAccountAsset } from "../../accounts/model.ts";
import { getInvestAccountFromTInvestAPI } from "../../accounts/service/getFromTInvestAPI.ts";
import { getAssetsFromTInvestApi } from "../../assets/service/getFromTInvestAPI.ts";
import { getDCAStrategyAssetsRatios } from "../helpers/getAssetsRatio.ts";
import type { DCAStrategy } from "../model.ts";

export async function executeDCAStrategy(
  strategy: DCAStrategy,
  accoundId: string
) {
  const assetsPromise = Promise.all([
    getInvestAccountFromTInvestAPI(accoundId),
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
    (tradingDays) => strategy.currentMonthBudget / tradingDays
  );

  const [assets, budget] = await Promise.all([assetsPromise, budgetPromise]);
  const targetRatios = getDCAStrategyAssetsRatios(strategy.assets);
  const rebalancedAssets = rebalanceInvestAccount(assets, targetRatios, budget);

  for (let i = 0; i < assets.length; i++) {
    const needToBuy = rebalancedAssets[i].quantity - assets[i].quantity;

    if (needToBuy > 0) {
      console.log(`buying ${needToBuy} ${assets[i].id}`);
    }
  }
}
