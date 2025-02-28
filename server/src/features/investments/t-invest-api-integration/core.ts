import { TinkoffInvestApi } from "tinkoff-invest-api";
import type { GetLastPricesRequest } from "tinkoff-invest-api/cjs/generated/marketdata.js";

const api = new TinkoffInvestApi({
  token: process.env.T_INVEST_READONLY_TOKEN as string,
});

const tInvestApi = {
  users: api.users,
  instruments: api.instruments,
  operations: api.operations,
  marketData: {
    ...api.marketdata,
    getLastPrices: (req: Pick<GetLastPricesRequest, "instrumentId">) =>
      api.marketdata.getLastPrices({
        ...(req as GetLastPricesRequest),
        figi: [],
      }),
  },
};

/*function tinvestFetch(path: string, body?: Record<string, unknown>) {
  return fetch(`https://invest-public-api.tinkoff.ru/rest${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.T_INVEST_FULL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body && JSON.stringify(body),
  });
}*/

export default tInvestApi;
