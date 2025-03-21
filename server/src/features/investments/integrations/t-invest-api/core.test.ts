import { it } from "node:test";
import tInvestApi from "./core.ts";
import {
  OrderDirection,
  OrderExecutionReportStatus,
  OrderType,
  PostOrderResponse,
  TimeInForceType,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import { PriceType } from "tinkoff-invest-api/cjs/generated/common.js";
import assert from "node:assert";
import { tmonFundId } from "./service/repo.ts";

it("should make post order", async (t) => {
  let response: PostOrderResponse;

  const testAccount = await tInvestApi.sandbox.openSandboxAccount({
    name: "t-invest-integration-test",
  });

  try {
    await tInvestApi.sandbox.sandboxPayIn({
      accountId: testAccount.accountId,
      amount: {
        currency: "RUB",
        units: 10000,
        nano: 0,
      },
    });

    response = await tInvestApi.sandbox.postOrder({
      quantity: 1,
      direction: OrderDirection.ORDER_DIRECTION_BUY,
      accountId: testAccount.accountId,
      orderType: OrderType.ORDER_TYPE_MARKET,
      orderId: crypto.randomUUID(),
      instrumentId: tmonFundId,
      timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
      priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
    });
  } catch (e: any) {
    return t.skip(e?.message);
  } finally {
    tInvestApi.sandbox.closeSandboxAccount({
      accountId: testAccount.accountId,
    });
  }

  assert.strictEqual(response.direction, OrderDirection.ORDER_DIRECTION_BUY);
  assert.strictEqual(response.orderType, OrderType.ORDER_TYPE_MARKET);
  assert.strictEqual(response.instrumentUid, tmonFundId);
  assert.strictEqual(
    response.executionReportStatus,
    OrderExecutionReportStatus.EXECUTION_REPORT_STATUS_FILL
  );
});
