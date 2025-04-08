import {
  OrderDirection,
  OrderType,
  TimeInForceType,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import type { Asset } from "../../assets/model.ts";
import tInvestApi from "../../integrations/t-invest-api/core.ts";
import { PriceType } from "tinkoff-invest-api/cjs/generated/common.js";
import type { OrderedAsset } from "../model.ts";
import { Helpers } from "tinkoff-invest-api";

export async function orderFromTInvestApi(
  accountId: string,
  asset: Asset,
  quantity: number
): Promise<OrderedAsset> {
  try {
    const order = await tInvestApi.orders.postOrder({
      quantity,
      direction: OrderDirection.ORDER_DIRECTION_BUY,
      accountId,
      orderType: OrderType.ORDER_TYPE_MARKET,
      orderId: crypto.randomUUID(),
      instrumentId: asset.id,
      timeInForce: TimeInForceType.TIME_IN_FORCE_UNSPECIFIED,
      priceType: PriceType.PRICE_TYPE_UNSPECIFIED,
    });

    const total = Helpers.toNumber(order.totalOrderAmount) || 0;

    return {
      id: asset.id,
      currentPrice: total / order.lotsExecuted,
      quantity: order.lotsExecuted,
    };
  } catch (e: any) {
    return {
      id: asset.id,
      currentPrice: 0,
      quantity: 0,
      error: e?.message || "",
    };
  }
}
