import type { Asset } from "../assets/model.ts";

export type OrderedAsset = Asset & { quantity: number; error?: string };
