import assert from "node:assert";
import { type Asset, rebalanceAssets } from "./rebalance-algorithm.ts";
import { it } from "node:test";

it("should correctly rebalance assets", () => {
  const assets: Asset[] = [
    {
      id: "1",
      quantity: 10,
      avgPrice: 100,
      currentPrice: 110,
      targetRatio: 0.5,
    },
    {
      id: "2",
      quantity: 5,
      avgPrice: 200,
      currentPrice: 210,
      targetRatio: 0.5,
    },
  ];
  const additionalMoney = 1000;

  assert.deepStrictEqual(rebalanceAssets(assets, additionalMoney), [
    {
      asset: assets[0],
      needToBuy: 4,
    },
    {
      asset: assets[1],
      needToBuy: 2,
    },
  ]);
});

it("should handle zero additional money", () => {
  const assets: Asset[] = [
    {
      id: "1",
      quantity: 10,
      avgPrice: 100,
      currentPrice: 110,
      targetRatio: 0.5,
    },
    {
      id: "2",
      quantity: 5,
      avgPrice: 200,
      currentPrice: 210,
      targetRatio: 0.5,
    },
  ];
  const additionalMoney = 0;

  assert.deepStrictEqual(rebalanceAssets(assets, additionalMoney), [
    {
      asset: assets[0],
      needToBuy: 0,
    },
    {
      asset: assets[1],
      needToBuy: 0,
    },
  ]);
});

it("should handle no assets", () => {
  const assets: Asset[] = [];
  const additionalMoney = 1000;

  assert.deepStrictEqual(rebalanceAssets(assets, additionalMoney), []);
});

it("should handle asset with desired sum less than current sum", () => {
  const assets: Asset[] = [
    {
      id: "1",
      quantity: 10,
      avgPrice: 100,
      currentPrice: 110,
      targetRatio: 0.2,
    },
    {
      id: "2",
      quantity: 5,
      avgPrice: 200,
      currentPrice: 210,
      targetRatio: 0.8,
    },
  ];
  const additionalMoney = 1000;

  assert.deepStrictEqual(rebalanceAssets(assets, additionalMoney), [
    {
      asset: assets[0],
      needToBuy: 0,
    },
    {
      asset: assets[1],
      needToBuy: 4,
    },
  ]);
});
