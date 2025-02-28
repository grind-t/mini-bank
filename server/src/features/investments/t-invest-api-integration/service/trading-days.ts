import dayjs from "dayjs";
import tInvestApi from "../core.ts";

export async function getCurrentMonthTradingDays() {
  const today = dayjs();
  const endOfMonth = today.endOf("month");
  const schedule = await tInvestApi.instruments.tradingSchedules({
    exchange: "MOEX",
    from: today.toDate(),
    to: endOfMonth.toDate(),
  });
  return schedule.exchanges[0].days.filter((day) => day.isTradingDay).length;
}
