import { getBondPrice } from "./bond-price.ts";
import { describe, it } from "node:test";
import assert from "node:assert";
import type { Bond } from "tinkoff-invest-api/cjs/generated/instruments.js";

describe("getBondPrice", () => {
  it("should calculate correctly with all values present", () => {
    const price = { units: 100, nano: 0 };
    const bond = {
      nominal: { units: 1000, nano: 0 },
      aciValue: { units: 50, nano: 0 },
    } as Bond;
    assert.strictEqual(getBondPrice(price, bond), 1050);
  });

  it("should handle price of zero", () => {
    const price = { units: 0, nano: 0 };
    const bond = {
      nominal: { units: 1000, nano: 0 },
      aciValue: { units: 50, nano: 0 },
    } as Bond;
    assert.strictEqual(getBondPrice(price, bond), 50);
  });

  it("should handle aciValue of zero", () => {
    const price = { units: 100, nano: 0 };
    const bond = {
      nominal: { units: 1000, nano: 0 },
      aciValue: { units: 0, nano: 0 },
    } as Bond;
    assert.strictEqual(getBondPrice(price, bond), 1000);
  });

  it("should handle nominal of zero", () => {
    const price = { units: 100, nano: 0 };
    const bond = {
      nominal: { units: 0, nano: 0 },
      aciValue: { units: 50, nano: 0 },
    } as Bond;
    assert.strictEqual(getBondPrice(price, bond), 50);
  });

  it("should handle missing aciValue", () => {
    const price = { units: 100, nano: 0 };
    const bond = {
      nominal: { units: 1000, nano: 0 },
      aciValue: undefined,
    } as Bond;
    assert.strictEqual(getBondPrice(price, bond), 1000);
  });

  it("should handle missing nominal", () => {
    const price = { units: 100, nano: 0 };
    const bond = {
      aciValue: { units: 50, nano: 0 },
    } as Bond;
    assert.strictEqual(getBondPrice(price, bond), 50);
  });

  it("should handle missing nominal and aciValue", () => {
    const price = { units: 100, nano: 0 };
    const bond = {} as Bond;
    assert.strictEqual(getBondPrice(price, bond), 0);
  });

  it("should handle fractional price", () => {
    const price = { units: 99, nano: 500000000 }; // 99.5
    const bond = {
      nominal: { units: 1000, nano: 0 },
      aciValue: { units: 50, nano: 0 },
    } as Bond;
    assert.strictEqual(getBondPrice(price, bond), 995 + 50); // 1045
  });

  it("should return zero when all inputs are zero", () => {
    const price = { units: 0, nano: 0 };
    const bond = {
      nominal: { units: 0, nano: 0 },
      aciValue: { units: 0, nano: 0 },
    } as Bond;
    assert.strictEqual(getBondPrice(price, bond), 0);
  });
});
