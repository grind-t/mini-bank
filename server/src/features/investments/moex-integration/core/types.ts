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
