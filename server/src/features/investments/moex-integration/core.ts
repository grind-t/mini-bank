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

function moexData<T extends Record<string, unknown>>(table: {
  columns: (keyof T)[];
  data: T[keyof T][][];
}): T[] {
  return table.data.map((row) => {
    const record = {} as T;
    table.columns.forEach((column, i) => {
      record[column] = row[i];
    });
    return record;
  });
}

export async function moexFetch<T extends Record<string, unknown>>(
  path: string,
  block: string,
  params: Record<string, string | number | undefined> = {}
) {
  const url = new URL(`https://iss.moex.com/iss/${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    url.searchParams.set(key, value.toString());
  });

  url.searchParams.set("iss.meta", "off");
  url.searchParams.set("iss.only", block);

  const response = await fetch(url);
  const data = await response.json();

  return moexData<T>(data[block]);
}
