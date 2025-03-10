import { it } from "node:test";
import assert from "node:assert";
import { rebalanceInvestAccount } from "./rebalance.ts";
import type { InvestAccountAsset } from "../model.ts";

it("returns unchanged assets if budget is zero", () => {
  const assets = [
    { quantity: 10, averagePrice: 100, currentPrice: 110 },
  ] as InvestAccountAsset[];
  const result = rebalanceInvestAccount(assets, [1], 0);
  assert.deepStrictEqual(result, assets);
});

it("returns empty array if no assets", () => {
  const result = rebalanceInvestAccount([], [1], 500);
  assert.deepStrictEqual(result, []);
});

it("increments quantity when budget is sufficient", () => {
  const assets = [
    { quantity: 10, averagePrice: 100, currentPrice: 50 },
    { quantity: 20, averagePrice: 200, currentPrice: 150 },
  ] as InvestAccountAsset[];
  const budget = 300;
  const result = rebalanceInvestAccount(assets, [0.5, 0.5], budget);
  assert.strictEqual(result[0].quantity, 16);
  assert.strictEqual(result[1].quantity, 20);
});

it("does not purchase if asset price exceeds remaining budget", (t) => {
  const assets = [
    { quantity: 5, averagePrice: 100, currentPrice: 200 },
  ] as InvestAccountAsset[];
  const budget = 150;
  const result = rebalanceInvestAccount(assets, [1], budget);
  assert.strictEqual(result[0].quantity, 5);
});
