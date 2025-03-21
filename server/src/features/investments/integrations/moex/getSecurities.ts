import { moexFetch } from "./core/fetch.ts";
import type { Engine, Market } from "./core/types.ts";

export type MoexSecurity = {
  id: number;
  secid: string;
  shortname: string;
  regnumber: string;
  name: string;
  isin: string;
  is_traded: number;
  emitent_id: number;
  emitent_title: string;
  emitent_inn: string;
  emitent_okpo: string;
  gosreg: string;
  type: string;
  group: string;
  primary_boardid: string;
  marketprice_boardid: string;
};

export const getMoexSecurities = (params: {
  q?: string;
  lang?: "ru" | "en";
  engine?: Engine;
  is_trading?: 1 | 0;
  market?: Market;
  group_by?: "group" | "type";
  limit?: 5 | 10 | 20 | 100;
  group_by_filter?: string;
  start?: number;
}) => moexFetch<MoexSecurity>("/securities.json", "securities", params);
