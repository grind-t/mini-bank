import assert from "node:assert";
import { it } from "node:test";
import { dateFilter } from "./date.ts";
import type { OpUnitType } from "dayjs";

it("should return true if filter is nullish", () => {
  const result = dateFilter(new Date(), undefined);
  assert.strictEqual(result, true);
});

it("should return !filter.exists if value is nullish", () => {
  assert.strictEqual(dateFilter(undefined, { exists: true }), false);
  assert.strictEqual(dateFilter(undefined, { exists: false }), true);
});

it("should return true if value is within gte and lte bounds", () => {
  const base = new Date("2023-01-15T00:00:00Z");
  const filter = {
    gte: new Date("2023-01-10T00:00:00Z"),
    lte: new Date("2023-01-20T00:00:00Z"),
    unit: "day" as OpUnitType,
  };
  assert.strictEqual(dateFilter(base, filter), true);
});

it("should return false if value is before gte bound", () => {
  const base = new Date("2023-01-05T00:00:00Z");
  const filter = {
    gte: new Date("2023-01-10T00:00:00Z"),
    lte: new Date("2023-01-20T00:00:00Z"),
    unit: "day" as OpUnitType,
  };
  assert.strictEqual(dateFilter(base, filter), false);
});

it("should return false if value is after lte bound", () => {
  const base = new Date("2023-01-25T00:00:00Z");
  const filter = {
    exists: true,
    gte: new Date("2023-01-10T00:00:00Z"),
    lte: new Date("2023-01-20T00:00:00Z"),
    unit: "day" as OpUnitType,
  };
  assert.strictEqual(dateFilter(base, filter), false);
});
