import { moexFetch } from "./core/fetch.ts";

export type MoextDailyTableRow = {
  date: string;
  is_work_day: boolean;
  start_time: string;
  stop_time: string;
};

export const getMoexDailyTable = () =>
  moexFetch<MoextDailyTableRow>("/engines/stock.json", "dailytable");
