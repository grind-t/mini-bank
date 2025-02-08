import { Asset, rebalanceAssets } from "./rebalance-algorithm.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("rebalanceAssets should correctly rebalance assets", () => {
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

  assertEquals(rebalanceAssets(assets, additionalMoney), [
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

Deno.test("rebalanceAssets should handle zero additional money", () => {
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

  assertEquals(rebalanceAssets(assets, additionalMoney), [
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

Deno.test("rebalanceAssets should handle no assets", () => {
  const assets: Asset[] = [];
  const additionalMoney = 1000;

  assertEquals(rebalanceAssets(assets, additionalMoney), []);
});

Deno.test("rebalanceAssets should handle asset with desired sum less than current sum", () => {
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

  assertEquals(rebalanceAssets(assets, additionalMoney), [
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
