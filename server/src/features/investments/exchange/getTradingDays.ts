import dayjs from "dayjs";

export function getTradingDays(
  from: dayjs.ConfigType,
  to: dayjs.ConfigType,
  dayOffs: dayjs.ConfigType[]
) {
  const start = dayjs(from);
  const end = dayjs(to);
  const offs = dayOffs
    .map((v) => dayjs(v))
    .filter(
      (date) =>
        (date.isAfter(start, "day") || date.isSame(start, "day")) &&
        (date.isBefore(end, "day") || date.isSame(end, "day"))
    );

  let tradingDays = 0;

  for (
    let day = start;
    day.isBefore(end, "day") || day.isSame(end, "day");
    day = day.add(1, "day")
  ) {
    const isWeekend = day.day() === 0 || day.day() === 6;
    const isDayoff = offs.some((v) => day.isSame(v, "day"));

    if (isWeekend || isDayoff) continue;

    tradingDays++;
  }

  return tradingDays;
}
