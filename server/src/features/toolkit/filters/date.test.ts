import { it } from "node:test";
import assert from "node:assert";
import { dateFilter } from "./date.ts";
import type { OpUnitType } from "dayjs";

it("should return true if value is undefined", () => {
  assert.strictEqual(dateFilter(undefined, { min: new Date() }), true);
});

it("should return true if filter is undefined", () => {
  assert.strictEqual(dateFilter(new Date(), undefined), true);
});

it("should return false if value is before min", () => {
  const now = new Date();
  const future = new Date(now.getTime() + 10000);
  const filter = { min: future };
  assert.strictEqual(dateFilter(now, filter), false);
});

it("should return true if value equals min", () => {
  const now = new Date();
  const filter = { min: now };
  assert.strictEqual(dateFilter(now, filter), true);
});

it("should return false if value is after max", () => {
  const now = new Date();
  const past = new Date(now.getTime() - 10000);
  const filter = { max: past };
  assert.strictEqual(dateFilter(now, filter), false);
});

it("should return true if value equals max", () => {
  const now = new Date();
  const filter = { max: now };
  assert.strictEqual(dateFilter(now, filter), true);
});

it("should return true if value is within min and max", () => {
  const now = new Date();
  const past = new Date(now.getTime() - 10000);
  const future = new Date(now.getTime() + 10000);
  const filter = { min: past, max: future };
  assert.strictEqual(dateFilter(now, filter), true);
});

it("should compare using unit correctly", () => {
  const date1 = new Date("2023-10-05T01:00:00Z");
  const date2 = new Date("2023-10-05T23:00:00Z");
  const filter = { min: date1, max: date2, unit: "day" as OpUnitType };
  assert.strictEqual(dateFilter(date1, filter), true);
  assert.strictEqual(dateFilter(date2, filter), true);
});
