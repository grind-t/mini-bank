import { it } from "node:test";
import assert from "node:assert";
import { sum } from "./sum.ts";

it("should return sum of numbers when identity selector is used", () => {
  const result = sum([1, 2, 3, 4]);
  assert.strictEqual(result, 10);
});

it("should return 0 for an empty array", () => {
  const result = sum([]);
  assert.strictEqual(result, 0);
});

it("should work with objects using a numeric property", () => {
  const items = [{ value: 5 }, { value: 10 }, { value: 15 }];
  const result = sum(items, (item) => item.value);
  assert.strictEqual(result, 30);
});
