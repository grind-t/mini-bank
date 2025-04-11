import type { Asset } from "../assets/model.ts";

export type InvestAccountAssetShort = {
  id: string;
  quantity: number;
  averagePrice: number;
};

export type InvestAccountShort = {
  id: string;
  assets: InvestAccountAssetShort[];
};

export type InvestAccountAsset = InvestAccountAssetShort & Asset;

export type InvestAccount = {
  id: string;
  assets: InvestAccountAsset[];
};
