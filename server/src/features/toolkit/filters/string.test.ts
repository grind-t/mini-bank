import { it } from "node:test";
import assert from "node:assert";
import { stringFilter } from "./string.ts";

it("returns true if no filter provided", () => {
  const result = stringFilter("any value");
  assert.strictEqual(result, true);
});

it("returns true when value is in include array", () => {
  const filter = { include: ["hello", "world"] };
  const result = stringFilter("hello", filter);
  assert.strictEqual(result, true);
});

it("returns false when value is not in include array", () => {
  const filter = { include: ["foo", "bar"] };
  const result = stringFilter("hello", filter);
  assert.strictEqual(result, false);
});

it("returns false when value is in exclude array", () => {
  const filter = { exclude: ["test", "hello"] };
  const result = stringFilter("hello", filter);
  assert.strictEqual(result, false);
});

it("returns true when value is in include but not in exclude", () => {
  const filter = { include: ["test"], exclude: ["hello"] };
  const result = stringFilter("test", filter);
  assert.strictEqual(result, true);
});

it("returns false when value is in both include and exclude", () => {
  const filter = { include: ["test"], exclude: ["test"] };
  const result = stringFilter("test", filter);
  assert.strictEqual(result, false);
});
