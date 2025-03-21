import { getMoexDailyTable } from "./getDailyTable.ts";
import { getTradingDays } from "../../exchange/getTradingDays.ts";
import dayjs from "dayjs";

export async function getMoexTradingDays(
  from: dayjs.ConfigType,
  to: dayjs.ConfigType
) {
  const dailyTable = await getMoexDailyTable();
  const dayOffs = dailyTable
    .filter((v) => !v.is_work_day)
    .map((v) => dayjs(v.date));

  return getTradingDays(from, to, dayOffs);
}
