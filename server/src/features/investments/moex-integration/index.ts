export const baseUrl = "https://iss.moex.com/iss";

// https://iss.moex.com/iss/index.json?iss.only=engines
export type Engine =
  | "stock"
  | "state"
  | "currency"
  | "futures"
  | "commodity"
  | "interventions"
  | "offboard"
  | "agro"
  | "otc"
  | "quotes"
  | "money";

// https://iss.moex.com/iss/index.json?iss.only=markets
export type Market =
  | "repo"
  | "deposit"
  | "otcindices"
  | "index"
  | "shares"
  | "bonds"
  | "ndm"
  | "otc"
  | "ccp"
  | "qnv"
  | "mamc"
  | "foreignshares"
  | "foreignndm"
  | "moexboard"
  | "gcc"
  | "credit"
  | "selt"
  | "futures"
  | "otc"
  | "main"
  | "forts"
  | "options"
  | "fortsiqs"
  | "optionsiqs"
  | "bonds"
  | "sharesndm"
  | "ndm"
  | "nonresndm"
  | "nonresrepo"
  | "nonresccp"
  | "grain"
  | "sugar"
  | "auctions"
  | "buyauctions"
  | "saleauctions"
  | "standard"
  | "classica";

export type Security = {
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

function moexData<T extends Record<string, unknown>>(
  table: { columns: (keyof T)[]; data: T[keyof T][][] },
): T[] {
  return table.data.map((row) => {
    const record = {} as T;
    table.columns.forEach((column, i) => {
      record[column] = row[i];
    });
    return record;
  });
}

export async function getSecurities(
  params: {
    q?: string;
    lang?: "ru" | "en";
    engine?: Engine;
    is_trading?: 1 | 0;
    market?: Market;
    group_by?: "group" | "type";
    limit?: 5 | 10 | 20 | 100;
    group_by_filter?: string;
    start?: number;
  },
): Promise<Security[]> {
  const url = new URL(`${baseUrl}/securities.json`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    url.searchParams.set(key, value.toString());
  });

  const response = await fetch(url);
  const data = await response.json();

  return moexData<Security>(data.securities);
}
