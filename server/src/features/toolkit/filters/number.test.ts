import assert from "node:assert";
import { it } from "node:test";
import { numberFilter } from "./number.ts";

it("should return true if value is undefined", () => {
  assert.strictEqual(numberFilter(undefined, { min: 10 }), true);
});

it("should return true if filter is undefined", () => {
  assert.strictEqual(numberFilter(5, undefined), true);
});

it("should return false if value is less than min", () => {
  const filter = { min: 10 };
  assert.strictEqual(numberFilter(5, filter), false);
});

it("should return false if value is greater than max", () => {
  const filter = { max: 10 };
  assert.strictEqual(numberFilter(20, filter), false);
});

it("should return true if value is within min and max", () => {
  const filter = { min: 5, max: 10 };
  assert.strictEqual(numberFilter(7, filter), true);
});
