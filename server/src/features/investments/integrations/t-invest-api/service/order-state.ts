import {
  OrderExecutionReportStatus,
  OrderState,
  type GetOrderStateRequest,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import type { TInvestCtx } from "../model.ts";

export async function pollOrderState(
  req: GetOrderStateRequest,
  ctx: TInvestCtx
) {
  const { tInvestApi } = ctx;

  let response = await tInvestApi.orders.getOrderState(req);

  while (
    response.executionReportStatus ===
      OrderExecutionReportStatus.EXECUTION_REPORT_STATUS_NEW ||
    response.executionReportStatus ===
      OrderExecutionReportStatus.EXECUTION_REPORT_STATUS_PARTIALLYFILL
  ) {
    await new Promise((r) => setTimeout(r, 1000));
    response = await tInvestApi.orders.getOrderState(req);
  }

  return response;
}

export function isOrderFilled(state: OrderState) {
  return (
    state.executionReportStatus ===
    OrderExecutionReportStatus.EXECUTION_REPORT_STATUS_FILL
  );
}
