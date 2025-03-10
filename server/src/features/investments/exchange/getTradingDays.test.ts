import { it } from "node:test";
import assert from "node:assert";
import { getTradingDays } from "./getTradingDays.ts";

it("should return 5 trading days for Mon-Fri with no day offs", () => {
  const from = new Date("2023-09-04"); // Monday
  const to = new Date("2023-09-08"); // Friday
  const result = getTradingDays(from, to, []);
  assert.strictEqual(result, 5);
});

it("should exclude weekends from trading days over a week span", () => {
  const from = new Date("2023-09-04"); // Monday
  const to = new Date("2023-09-10"); // Sunday
  // Monday to Friday = 5 trading days; Sat and Sun are skipped.
  const result = getTradingDays(from, to, []);
  assert.strictEqual(result, 5);
});

it("should subtract a day off correctly (remove Wednesday)", () => {
  const from = new Date("2023-09-04"); // Monday
  const to = new Date("2023-09-08"); // Friday
  const dayOffs = [new Date("2023-09-06")]; // Wednesday off
  const result = getTradingDays(from, to, dayOffs);
  assert.strictEqual(result, 4);
});

it("should return 0 when the period is entirely on weekends", () => {
  const from = new Date("2023-09-09"); // Saturday
  const to = new Date("2023-09-10"); // Sunday
  const result = getTradingDays(from, to, []);
  assert.strictEqual(result, 0);
});
