import { it } from "node:test";
import assert from "node:assert";
import { stringFilter } from "./string.ts";

it("should return true if filter is undefined", () => {
  const result = stringFilter("any", undefined);
  assert.strictEqual(result, true);
});

it("should handle value nullish by returning !filter.exists", () => {
  let result = stringFilter(undefined, { exists: true });
  assert.strictEqual(result, false);
  result = stringFilter(undefined, { exists: false });
  assert.strictEqual(result, true);
});

it("should return false when filter.exists is false even if value is provided", () => {
  const result = stringFilter("anything", { exists: false });
  assert.strictEqual(result, false);
});

it("should return true when value is in filter.in and not in filter.nin", () => {
  const filter = { in: ["test", "foo"], nin: ["bar"] };
  const result = stringFilter("test", filter);
  assert.strictEqual(result, true);
});

it("should return false when value is not in filter.in", () => {
  const filter = { in: ["test", "foo"] };
  const result = stringFilter("other", filter);
  assert.strictEqual(result, false);
});

it("should return false when value is in filter.nin", () => {
  const filter = { nin: ["test"] };
  const result = stringFilter("test", filter);
  assert.strictEqual(result, false);
});

it("should return true when value is not in filter.nin", () => {
  const filter = { nin: ["test"] };
  const result = stringFilter("other", filter);
  assert.strictEqual(result, true);
});
