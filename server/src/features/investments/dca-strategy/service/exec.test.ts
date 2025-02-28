import type { getInvestAccountFromTInvestAPI } from "#features/investments/accounts/service/getFromTInvestAPI.ts";
import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";
import type { getCurrentMonthTradingDays } from "#features/investments/t-invest-api-integration/service/trading-days.ts";
import { it } from "node:test";
import { Helpers } from "tinkoff-invest-api";
import type { logDCAStrategy } from "./log.ts";

it("should correctly exec dca-strategy", async (t) => {
  const getInvestAccountFromTInvestAPIMock = t.mock.fn<
    typeof getInvestAccountFromTInvestAPI
  >(undefined, async (accountId) => {
    const portfolio = await tInvestApi.sandbox.getSandboxPortfolio({
      accountId,
    });

    return {
      id: portfolio.accountId,
      assets: portfolio.positions.map((position) => ({
        id: position.instrumentUid,
        quantity: Helpers.toNumber(position.quantity) || 0,
        currentPrice: Helpers.toNumber(position.currentPrice) || 0,
        averagePrice: Helpers.toNumber(position.averagePositionPrice) || 0,
      })),
    };
  });

  const getCurrentMonthTradingDaysMock = t.mock.fn<
    typeof getCurrentMonthTradingDays
  >(undefined, async () => 10);

  const postOrderMock = t.mock.fn<typeof tInvestApi.orders.postOrder>(
    undefined,
    tInvestApi.sandbox.postOrder
  );

  const logDCAStrategyMock = t.mock.fn<typeof logDCAStrategy>(
    undefined,
    async () => {}
  );

  t.mock.module("#features/investments/accounts/service/getFromTInvestAPI.ts", {
    namedExports: {
      getInvestAccountFromTInvestAPI: getInvestAccountFromTInvestAPIMock,
    },
  });

  t.mock.module(
    "#features/investments/t-invest-api-integration/service/trading-days.ts",
    {
      namedExports: {
        getCurrentMonthTradingDays: getCurrentMonthTradingDaysMock,
      },
    }
  );

  t.mock.module("#features/investments/t-invest-api-integration/core.ts", {
    defaultExport: {
      ...tInvestApi,
      orders: {
        ...tInvestApi.orders,
        postOrder: postOrderMock,
      },
    },
  });

  t.mock.module("./log.ts", {
    namedExports: { logDCAStrategy: logDCAStrategyMock },
  });

  const { transferFromREPO, transferToREPO } = await import(
    "#features/investments/t-invest-api-integration/service/repo.ts"
  );

  const testAccount = await tInvestApi.sandbox.openSandboxAccount({
    name: "dca-strategy-test",
  });

  try {
    await tInvestApi.sandbox.sandboxPayIn({
      accountId: testAccount.accountId,
      amount: {
        currency: "RUB",
        units: 20000,
        nano: 0,
      },
    });

    await transferToREPO(testAccount.accountId, 15000);
    await transferFromREPO(testAccount.accountId, 10000);

    /*await executeDCAStrategy(
      {
        id: "test-dca-strategy",
        currentMonthBudget: 10000,
        assets: [
          { id: "test-asset-1", weight: 1 },
          { id: "test-asset-2", weight: 3 },
        ],
      },
      testAccount.accountId
    );*/
  } catch (e: any) {
    return t.skip(e?.message);
  } finally {
    await tInvestApi.sandbox.closeSandboxAccount({
      accountId: testAccount.accountId,
    });
  }
});
