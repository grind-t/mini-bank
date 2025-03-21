import { toRecord } from "#src/features/toolkit/toRecord.ts";

export type BondFinderReportItem = {
  isin: string;
  name: string;
  sector: number;
  list_level: number;
  total_trades_perc: number;
  maturity_date: string;
  min_days_between_amort: number;
  coupon_months: number[];
  coupon_values: number[];
  close_yield: number;
  has_offer: boolean;
  in_abi: boolean;
  in_cbhy: boolean;
  high_risk: boolean;
  qual: boolean;
  rub: boolean;
  rating: number;
  waprice: number;
  amort_range_days: number;
  pending: boolean;
};

export async function getBondFinderReport(): Promise<BondFinderReportItem[]> {
  const response = await fetch(
    "https://raw.githubusercontent.com/bond-finder-lab/backend/refs/heads/master/docs/report-v1.json"
  );

  const data = (await response.json()) as {
    date: string;
    cols: (keyof BondFinderReportItem)[];
    rows: any[][];
  };

  return data.rows.map((row) => toRecord(row, (_, i) => data.cols[i]));
}
