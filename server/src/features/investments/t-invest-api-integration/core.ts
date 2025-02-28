import { TinkoffInvestApi } from "tinkoff-invest-api";
import type { GetLastPricesRequest } from "tinkoff-invest-api/cjs/generated/marketdata.js";
import {
  PostOrderRequest,
  PostOrderResponse,
} from "tinkoff-invest-api/cjs/generated/orders.js";
import { env } from "node:process";

const readonlyApi = new TinkoffInvestApi({
  token: env.T_INVEST_READONLY_TOKEN as string,
});

const tInvestFetch = (path: string, body?: any) => {
  return fetch(`https://invest-public-api.tinkoff.ru/rest${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.T_INVEST_FULL_ACCESS_TOKEN as string}`,
      "Content-Type": "application/json",
    },
    body: body && JSON.stringify(body),
  });
};

const postOrder = async (
  path: string,
  req: PostOrderRequest
): Promise<PostOrderResponse> => {
  const response = await tInvestFetch(path, PostOrderRequest.toJSON(req));

  if (!response.ok) {
    const message = await response
      .json()
      .then((v) => v.message)
      .catch(() => response.text());

    throw new Error(`${response.status} ${message}`);
  }

  return PostOrderResponse.fromJSON(await response.json());
};

const tInvestApi = {
  sandbox: {
    ...readonlyApi.sandbox,
    postOrder: (req: PostOrderRequest) =>
      postOrder(
        "/tinkoff.public.invest.api.contract.v1.SandboxService/PostSandboxOrder",
        req
      ),
  },
  users: readonlyApi.users,
  instruments: readonlyApi.instruments,
  operations: readonlyApi.operations,
  orders: {
    getOrderState: readonlyApi.orders.getOrderState,
    postOrder: (req: PostOrderRequest) =>
      postOrder(
        "/tinkoff.public.invest.api.contract.v1.OrdersService/PostOrder",
        req
      ),
  },
  marketData: {
    ...readonlyApi.marketdata,
    getLastPrices: (req: Pick<GetLastPricesRequest, "instrumentId">) =>
      readonlyApi.marketdata.getLastPrices({
        ...(req as GetLastPricesRequest),
        figi: [],
      }),
  },
};

export default tInvestApi;
