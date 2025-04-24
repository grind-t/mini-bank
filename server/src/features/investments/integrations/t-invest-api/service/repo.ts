import { Helpers, TinkoffInvestApi } from "tinkoff-invest-api";
import {
  OrderDirection,
  OrderIdType,
  OrderType,
  TimeInForceType,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import { PriceType } from "tinkoff-invest-api/cjs/generated/common.js";
import { isOrderFilled, pollOrderState } from "./order-state.ts";
import {
  getCurrencyBalance,
  getPositionBalance,
  getTransferQuantity,
} from "../helpers/transfer.ts";
import { LastPriceType } from "tinkoff-invest-api/cjs/generated/marketdata.js";
import type { TInvestCtx } from "../model.ts";

export type RepoTransferParams = {
  accountId: string;
  direction: OrderDirection;
  minSum?: number;
  maxSum?: number;
};

export const tmonFundId = "498ec3ff-ef27-4729-9703-a5aac48d5789";

export async function repoTransfer(
  { accountId, direction, minSum, maxSum }: RepoTransferParams,
  ctx: TInvestCtx
) {
  const { tInvestApi } = ctx;

  const pricePromise = tInvestApi.marketdata
    .getLastPrices({
      instrumentId: [tmonFundId],
      figi: [],
      lastPriceType: LastPriceType.LAST_PRICE_UNSPECIFIED,
    })
    .then(({ lastPrices }) => {
      if (!lastPrices[0]?.price) {
        throw new Error("Failed to get price for REPO Fund");
      }

      return Helpers.toNumber(lastPrices[0].price);
    });

  const positions = await tInvestApi.operations.getPositions({
    accountId,
  });

  const balance =
    direction === OrderDirection.ORDER_DIRECTION_BUY
      ? getCurrencyBalance(positions.money, "rub")
      : getPositionBalance(
          positions.securities,
          tmonFundId,
          await pricePromise
        );

  const orderResponse = await tInvestApi.orders.postOrder({
    quantity: getTransferQuantity(balance, await pricePromise, minSum, maxSum),
    direction,
    accountId,
    orderType: OrderType.ORDER_TYPE_MARKET,
    orderId: crypto.randomUUID(),
    instrumentId: tmonFundId,
    timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
    priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
  });

  const orderState = await pollOrderState(
    {
      accountId,
      orderId: orderResponse.orderId,
      orderIdType: OrderIdType.ORDER_ID_TYPE_EXCHANGE,
      priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
    },
    ctx
  );

  if (!isOrderFilled(orderState)) {
    throw new Error(
      `Failed to transfer money ${
        direction === OrderDirection.ORDER_DIRECTION_SELL ? "from" : "to"
      } REPO`
    );
  }
}
