import { it } from "node:test";
import assert from "node:assert/strict";
import { mapTInvestAccount } from "./mapTInvestAccount.ts";
import type { PortfolioResponse } from "tinkoff-invest-api/cjs/generated/operations.js";

it("should correctly map a PortfolioResponse with valid positions", () => {
  const mockResponse = {
    accountId: "test-account",
    positions: [
      {
        instrumentUid: "asset1",
        quantity: { units: 100, nano: 500000000 }, // 100.5
        currentPrice: { units: 200, nano: 300000000 }, // 200.3
        averagePositionPrice: { units: 150, nano: 0 }, // 150.0
      },
      {
        instrumentUid: "asset2",
        quantity: { units: 0, nano: 0 }, // 0.0
        currentPrice: { units: 0, nano: 0 }, // 0.0
        averagePositionPrice: { units: 50, nano: 250000000 }, // 50.25
      },
    ],
  } as PortfolioResponse;

  const result = mapTInvestAccount(mockResponse);

  assert.deepStrictEqual(result, {
    id: "test-account",
    assets: [
      {
        id: "asset1",
        quantity: 100.5,
        currentPrice: 200.3,
        averagePrice: 150,
      },
      {
        id: "asset2",
        quantity: 0,
        currentPrice: 0,
        averagePrice: 50.25,
      },
    ],
  });
});

it("should handle zero values in all fields", () => {
  const mockResponse = {
    accountId: "test-account-zero",
    positions: [
      {
        instrumentUid: "asset3",
        quantity: { units: 0, nano: 0 },
        currentPrice: { units: 0, nano: 0 },
        averagePositionPrice: { units: 0, nano: 0 },
      },
    ],
  } as PortfolioResponse;

  const result = mapTInvestAccount(mockResponse);

  assert.deepStrictEqual(result, {
    id: "test-account-zero",
    assets: [
      {
        id: "asset3",
        quantity: 0,
        currentPrice: 0,
        averagePrice: 0,
      },
    ],
  });
});
