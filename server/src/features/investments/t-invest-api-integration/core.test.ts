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

it("should make post order", async (t) => {
  let response: PostOrderResponse;

  try {
    response = await tInvestApi.sandbox.postOrder({
      quantity: 1,
      direction: OrderDirection.ORDER_DIRECTION_BUY,
      accountId: "d68d9cca-793d-456c-a77d-1dcd955dd42e",
      orderType: OrderType.ORDER_TYPE_MARKET,
      orderId: crypto.randomUUID(),
      instrumentId: "ade12bc5-07d9-44fe-b27a-1543e05bacfd",
      timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
      priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
    });
  } catch (e: any) {
    return t.skip(e?.message);
  }

  assert.strictEqual(response.direction, OrderDirection.ORDER_DIRECTION_BUY);
  assert.strictEqual(response.orderType, OrderType.ORDER_TYPE_MARKET);
  assert.strictEqual(
    response.instrumentUid,
    "ade12bc5-07d9-44fe-b27a-1543e05bacfd"
  );
  assert.strictEqual(
    response.executionReportStatus,
    OrderExecutionReportStatus.EXECUTION_REPORT_STATUS_FILL
  );
});
