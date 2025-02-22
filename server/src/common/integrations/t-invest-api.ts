import dayjs from "dayjs";
import { TinkoffInvestApi } from "tinkoff-invest-api";
import type { GetLastPricesRequest } from "tinkoff-invest-api/cjs/generated/marketdata.js";

const api = new TinkoffInvestApi({
  token: process.env.T_INVEST_READONLY_TOKEN as string,
});

export const getPortfolio = api.operations.getPortfolio;
export const findInstrument = api.instruments.findInstrument;
export const bondBy = api.instruments.bondBy;
export const getLastPrices = (
  req: Pick<GetLastPricesRequest, "instrumentId">
) =>
  api.marketdata.getLastPrices({
    ...(req as GetLastPricesRequest),
    figi: [],
  });

export async function getCurrentMonthTradingDays() {
  const today = dayjs();
  const endOfMonth = today.endOf("month");
  const schedule = await api.instruments.tradingSchedules({
    exchange: "MOEX",
    from: today.toDate(),
    to: endOfMonth.toDate(),
  });
  return schedule.exchanges[0].days.filter((day) => day.isTradingDay).length;
}

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
