import { it } from "node:test";
import assert from "node:assert";
import { booleanFilter } from "./boolean.ts";

it("should return true when filter is nullish", () => {
  assert.strictEqual(booleanFilter(true, undefined), true);
  assert.strictEqual(booleanFilter(false, undefined), true);
});

it('should return based on "exists" when value is nullish', () => {
  assert.strictEqual(booleanFilter(undefined, { exists: true }), false);
  assert.strictEqual(booleanFilter(undefined, { exists: false }), true);
});

it("should compare value with filter.eq when value is defined", () => {
  assert.strictEqual(booleanFilter(true, { eq: true }), true);
  assert.strictEqual(booleanFilter(true, { eq: false }), false);
  assert.strictEqual(booleanFilter(true, { exists: false, eq: true }), false);
});
