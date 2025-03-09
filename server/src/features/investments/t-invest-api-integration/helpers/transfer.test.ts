import { describe, it } from "node:test";
import assert from "node:assert";
import {
  getCurrencyBalance,
  getPositionBalance,
  getTransferQuantity,
} from "./transfer.ts";
import type { PositionsSecurities } from "tinkoff-invest-api/cjs/generated/operations.js";

describe("getCurrencyBalance", () => {
  it("should return correct balance for existing currency", () => {
    const money = [{ currency: "rub", units: 100, nano: 500000000 }]; // 100.5 RUB
    assert.strictEqual(getCurrencyBalance(money, "rub"), 100.5);
  });

  it("should return 0 when currency not found", () => {
    const money = [{ currency: "usd", units: 50, nano: 0 }];
    assert.strictEqual(getCurrencyBalance(money, "rub"), 0);
  });

  it("should handle currency case insensitively", () => {
    const money = [{ currency: "RUB", units: 200, nano: 0 }];
    assert.strictEqual(getCurrencyBalance(money, "rub"), 200);
  });
});

describe("getPositionBalance", () => {
  const positions = [
    { instrumentUid: "123", balance: 10 },
    { instrumentUid: "456", balance: 5 },
  ] as PositionsSecurities[];

  it("should calculate balance for existing position", () => {
    assert.strictEqual(getPositionBalance(positions, "123", 100), 10 * 100);
  });

  it("should return 0 for non-existent position", () => {
    assert.strictEqual(getPositionBalance(positions, "789", 100), 0);
  });
});

describe("getTransferQuantity", () => {
  it("should calculate max quantity within constraints", () => {
    assert.strictEqual(getTransferQuantity(1000, 100, 500, 1000), 5);
  });

  it("should use maxSum when lower than balance", () => {
    assert.strictEqual(getTransferQuantity(1500, 100, 0, 1200), 12);
  });

  it("should throw if balance less than minSum", () => {
    assert.throws(
      () => getTransferQuantity(300, 100, 500),
      /Invalid transfer constraints/
    );
  });

  it("should handle default minSum (0)", () => {
    assert.strictEqual(getTransferQuantity(1000, 100), 10);
  });

  it("should handle default maxSum (Infinity)", () => {
    assert.strictEqual(getTransferQuantity(500, 100, 0), 5);
  });

  it("should use Math.floor for maxQuantity when division results in fractional number", () => {
    // balance = 1000, price = 300 maxSum = 800
    // maxQuantity = Math.floor(800 / 300) = 2
    assert.strictEqual(getTransferQuantity(1000, 300, 0, 800), 2);
  });

  it("should use Math.ceil for minQuantity when division results in fractional number", () => {
    // balance = 400, price = 300, minSum = 500
    // minQuantity = Math.ceil(500 / 300) = 2
    // actualMinSum = 2 * 300 = 600
    // 400 < 600, so it should throw
    assert.throws(
      () => getTransferQuantity(400, 300, 500),
      /Invalid transfer constraints/
    );
  });
});
