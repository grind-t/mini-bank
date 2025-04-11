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
        quantity: { units: 100, nano: 500000000 },
        averagePositionPrice: { units: 150, nano: 0 },
      },
      {
        instrumentUid: "asset2",
        quantity: { units: 0, nano: 0 },
        averagePositionPrice: { units: 50, nano: 250000000 },
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
        averagePrice: 150,
      },
      {
        id: "asset2",
        quantity: 0,
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
        averagePrice: 0,
      },
    ],
  });
});
