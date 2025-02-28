import { Helpers } from "tinkoff-invest-api";
import tInvestApi from "#features/investments/t-invest-api-integration/core.ts";
import {
  OrderDirection,
  OrderIdType,
  OrderType,
  TimeInForceType,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import { PriceType } from "tinkoff-invest-api/cjs/generated/common.js";
import { isOrderFilled, pollOrderState } from "./order-state.ts";

const lqdtFundId = "ade12bc5-07d9-44fe-b27a-1543e05bacfd";

async function transfer(
  accountId: string,
  sum: number,
  direction: OrderDirection
) {
  const priceResponse = await tInvestApi.marketData.getLastPrices({
    instrumentId: [lqdtFundId],
  });

  const price = priceResponse.lastPrices[0]?.price;

  if (!price) {
    throw new Error("Failed to get price for REPO Fund");
  }

  const quantity = Math.ceil(sum / Helpers.toNumber(price));

  const orderResponse = await tInvestApi.orders.postOrder({
    quantity,
    direction,
    accountId,
    orderType: OrderType.ORDER_TYPE_MARKET,
    orderId: crypto.randomUUID(),
    instrumentId: lqdtFundId,
    timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
    priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
  });

  const orderState = await pollOrderState({
    accountId,
    orderId: orderResponse.orderId,
    orderIdType: OrderIdType.ORDER_ID_TYPE_EXCHANGE,
    priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
  });

  if (!isOrderFilled(orderState)) {
    throw new Error(
      `Failed to transfer money ${
        direction === OrderDirection.ORDER_DIRECTION_SELL ? "from" : "to"
      } REPO`
    );
  }
}

export async function transferFromREPO(accountId: string, sum: number) {
  return await transfer(accountId, sum, OrderDirection.ORDER_DIRECTION_SELL);
}

export async function transferToREPO(accountId: string, sum: number) {
  return await transfer(accountId, sum, OrderDirection.ORDER_DIRECTION_BUY);
}
