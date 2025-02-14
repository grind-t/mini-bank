import assert from "node:assert";
import { rebalanceInvestAccount } from "./rebalance.ts";
import { it } from "node:test";
import type { InvestAccountAsset } from "../model.ts";

it("should correctly rebalance assets", () => {
  const assets: InvestAccountAsset[] = [
    {
      id: "1",
      quantity: 10,
      averagePrice: 100,
      currentPrice: 110,
    },
    {
      id: "2",
      quantity: 5,
      averagePrice: 200,
      currentPrice: 210,
    },
  ];
  const targetRatios = [0.5, 0.5];
  const budget = 1000;

  assert.deepStrictEqual(rebalanceInvestAccount(assets, targetRatios, budget), [
    {
      ...assets[0],
      quantity: assets[0].quantity + 4,
    },
    {
      ...assets[1],
      quantity: assets[1].quantity + 2,
    },
  ]);
});

it("should handle zero additional money", () => {
  const assets: InvestAccountAsset[] = [
    {
      id: "1",
      quantity: 10,
      averagePrice: 100,
      currentPrice: 110,
    },
    {
      id: "2",
      quantity: 5,
      averagePrice: 200,
      currentPrice: 210,
    },
  ];
  const targetRatios = [0.5, 0.5];
  const budget = 0;

  assert.deepStrictEqual(
    rebalanceInvestAccount(assets, targetRatios, budget),
    assets
  );
});

it("should handle no assets", () => {
  const assets: InvestAccountAsset[] = [];
  const targetRatios = [0.5, 0.5];
  const budget = 1000;

  assert.deepStrictEqual(
    rebalanceInvestAccount(assets, targetRatios, budget),
    assets
  );
});

it("should handle asset with desired sum less than current sum", () => {
  const assets: InvestAccountAsset[] = [
    {
      id: "1",
      quantity: 10,
      averagePrice: 100,
      currentPrice: 110,
    },
    {
      id: "2",
      quantity: 5,
      averagePrice: 200,
      currentPrice: 210,
    },
  ];
  const targetRatios = [0.2, 0.8];
  const budget = 1000;

  assert.deepStrictEqual(rebalanceInvestAccount(assets, targetRatios, budget), [
    {
      ...assets[0],
      quantity: assets[0].quantity + 0,
    },
    {
      ...assets[1],
      quantity: assets[1].quantity + 4,
    },
  ]);
});
