import dayjs from "dayjs";
import { getMoexDailyTable } from "#features/investments/moex-integration/daily-table.ts";

export async function getCurrentMonthTradingDays() {
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");
  const moexDayOffs = (await getMoexDailyTable())
    .filter((row) => !row.is_work_day)
    .map((row) => dayjs(row.date))
    .filter((date) => date.isSame(startOfMonth, "month"));

  let workingDays = 0;

  for (
    let day = startOfMonth;
    day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day");
    day = day.add(1, "day")
  ) {
    if (
      day.day() !== 0 &&
      day.day() !== 6 &&
      !moexDayOffs.some((dayOff) => day.isSame(dayOff, "day"))
    ) {
      workingDays++;
    }
  }

  return workingDays;
}
