import { strict as assert } from "assert";
import { it } from "node:test";
import { stringFilter } from "./string.ts";

it("should return true if filter is undefined", () => {
  assert.strictEqual(stringFilter("a", undefined), true);
});

it("should return true if filter includes value", () => {
  assert.strictEqual(stringFilter("a", ["a", "b", "c"]), true);
});

it("should return false if filter does not include value", () => {
  assert.strictEqual(stringFilter("x", ["a", "b", "c"]), false);
});
