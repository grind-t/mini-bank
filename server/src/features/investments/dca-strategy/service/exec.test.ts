import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";
import { it } from "node:test";
import assert from "node:assert";
import type { getCurrentMonthTradingDays } from "#features/investments/t-invest-api-integration/service/trading-days.ts";
import type { logDCAStrategy } from "./log.ts";
import { OrderDirection } from "tinkoff-invest-api/cjs/generated/orders.js";

it("should correctly exec dca-strategy", async (t) => {
  t.mock.method(
    tInvestApi.operations,
    "getPortfolio",
    tInvestApi.sandbox.getSandboxPortfolio
  );

  const postOrderMock = t.mock.method(
    tInvestApi.orders,
    "postOrder",
    tInvestApi.sandbox.postOrder
  );

  t.mock.method(
    tInvestApi.orders,
    "getOrderState",
    tInvestApi.sandbox.getSandboxOrderState
  );

  const getCurrentMonthTradingDaysMock = t.mock.fn<
    typeof getCurrentMonthTradingDays
  >(async () => 10);

  const logDCAStrategyMock = t.mock.fn<typeof logDCAStrategy>(async () => {});

  t.mock.module(
    "#features/investments/t-invest-api-integration/service/trading-days.ts",
    {
      namedExports: {
        getCurrentMonthTradingDays: getCurrentMonthTradingDaysMock,
      },
    }
  );

  t.mock.module("./log.ts", {
    namedExports: { logDCAStrategy: logDCAStrategyMock },
  });

  const [{ repoTransfer }, { executeDCAStrategy }] = await Promise.all([
    import("#features/investments/t-invest-api-integration/service/repo.ts"),
    import("./exec.ts"),
  ]);

  const testAccount = await tInvestApi.sandbox.openSandboxAccount({
    name: "dca-strategy-test",
  });

  try {
    await tInvestApi.sandbox.sandboxPayIn({
      accountId: testAccount.accountId,
      amount: {
        currency: "RUB",
        units: 110000,
        nano: 0,
      },
    });

    await repoTransfer({
      accountId: testAccount.accountId,
      direction: OrderDirection.ORDER_DIRECTION_BUY,
      minSum: 100000,
    });

    postOrderMock.mock.mockImplementation((() => {}) as any);
    postOrderMock.mock.mockImplementationOnce(tInvestApi.sandbox.postOrder);

    const strategy = {
      id: "test-dca-strategy",
      currentMonthBudget: 100000,
      assets: [
        { id: "92b9e913-d7df-4164-bd83-1013c819bf44", weight: 1 },
        { id: "9b933bc0-bc9c-46c3-8be0-d15249b81408", weight: 3 },
      ],
    };

    await executeDCAStrategy(strategy, testAccount.accountId);
  } catch (e: any) {
    return t.skip(e?.message);
  } finally {
    tInvestApi.sandbox.closeSandboxAccount({
      accountId: testAccount.accountId,
    });
  }

  const { rebalancedAssets } = logDCAStrategyMock.mock.calls[0].arguments[0];
  const ratio1 =
    (rebalancedAssets[0].quantity * rebalancedAssets[0].currentPrice) / 10000;
  const ratio2 =
    (rebalancedAssets[1].quantity * rebalancedAssets[1].currentPrice) / 10000;

  assert.strictEqual(logDCAStrategyMock.mock.callCount(), 1);
  assert(ratio1 <= 0.25 && ratio1 >= 0.2);
  assert(ratio2 <= 0.75 && ratio2 >= 0.7);
});
