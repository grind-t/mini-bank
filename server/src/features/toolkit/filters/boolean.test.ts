import { it } from "node:test";
import assert from "node:assert";
import { booleanFilter } from "./boolean.ts";

it("returns true if value or filter is undefined", () => {
  assert.strictEqual(booleanFilter(undefined, undefined), true);
  assert.strictEqual(booleanFilter(true, undefined), true);
  assert.strictEqual(booleanFilter(undefined, false), true);
});

it("returns true when value matches filter", () => {
  assert.strictEqual(booleanFilter(true, true), true);
  assert.strictEqual(booleanFilter(false, false), true);
});

it("returns false when value does not match filter", () => {
  assert.strictEqual(booleanFilter(true, false), false);
  assert.strictEqual(booleanFilter(false, true), false);
});
