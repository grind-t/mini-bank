import type { Asset } from "../assets/model.ts";

export type InvestAccountAsset = Asset & {
  quantity: number;
  averagePrice: number;
};

export type InvestAccount = {
  id: string;
  assets: InvestAccountAsset[];
};
