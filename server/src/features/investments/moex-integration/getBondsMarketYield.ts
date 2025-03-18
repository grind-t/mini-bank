import { moexFetch } from "./core/fetch.ts";

export type MoexBondMarketYield = {
  SECID: string;
  BOARDID: string;
  PRICE: number;
  YIELDDATE: string;
  ZCYCMOMENT: string;
  YIELDDATETYPE: string;
  EFFECTIVEYIELD: number;
  DURATION: number;
  ZSPREADBP: number;
  GSPREADBP: number;
  WAPRICE: number;
  EFFECTIVEYIELDWAPRICE: number;
  DURATIONWAPRICE: number;
  IR: number;
  ICPI: number;
  BEI: number;
  CBR: number;
  YIELDTOOFFER: number;
  YIELDLASTCOUPON: number;
  TRADEMOMENT: string;
  SEQNUM: number;
  SYSTIME: string;
};

export const getMoexBondsMarketYield = () =>
  moexFetch<MoexBondMarketYield>(
    `/engines/stock/markets/bonds/securities.json`,
    "marketdata_yields"
  );
