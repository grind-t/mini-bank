import { it } from "node:test";
import assert from "node:assert";
import { numberFilter } from "./number.ts";

it("returns true if filter is nullish", () => {
  assert.strictEqual(numberFilter(5, undefined), true);
  assert.strictEqual(numberFilter(undefined, undefined), true);
});

it("returns false if value is nullish and filter.exists is true", () => {
  const filter = { exists: true };
  assert.strictEqual(numberFilter(undefined, filter), false);
});

it("returns true if value is nullish and filter.exists is false", () => {
  const filter = { exists: false };
  assert.strictEqual(numberFilter(undefined, filter), true);
});

it("returns false if value exists but filter.exists is false", () => {
  const filter = { exists: false, gte: 0, lte: 10 };
  assert.strictEqual(numberFilter(5, filter), false);
});

it("checks gte condition correctly", () => {
  const filter = { gte: 10 };
  assert.strictEqual(numberFilter(15, filter), true);
  assert.strictEqual(numberFilter(9, filter), false);
});

it("checks lte condition correctly", () => {
  const filter = { lte: 20 };
  assert.strictEqual(numberFilter(15, filter), true);
  assert.strictEqual(numberFilter(25, filter), false);
});

it("returns true if value is between gte and lte", () => {
  const filter = { gte: 10, lte: 20 };
  assert.strictEqual(numberFilter(15, filter), true);
  assert.strictEqual(numberFilter(10, filter), true);
  assert.strictEqual(numberFilter(20, filter), true);
  assert.strictEqual(numberFilter(9, filter), false);
  assert.strictEqual(numberFilter(21, filter), false);
});
