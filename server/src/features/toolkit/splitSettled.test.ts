import { it } from "node:test";
import assert from "node:assert";
import { splitSettled } from "./splitSettled.ts";

it("returns all fulfilled values if no promise rejects", async (t) => {
  const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
  const [fulfilled, rejected] = await splitSettled(promises);
  assert.deepStrictEqual(fulfilled, [1, 2, 3]);
  assert.deepStrictEqual(rejected, []);
});

it("separates fulfilled and rejected promises", async (t) => {
  const err = new Error("failure");
  const promises = [Promise.resolve("success"), Promise.reject(err)];
  const [fulfilled, rejected] = await splitSettled(promises);
  assert.deepStrictEqual(fulfilled, ["success"]);
  assert.strictEqual(rejected.length, 1);
  assert.strictEqual(rejected[0].message, "failure");
});

it("returns empty arrays when given no promises", async (t) => {
  const [fulfilled, rejected] = await splitSettled([]);
  assert.deepStrictEqual(fulfilled, []);
  assert.deepStrictEqual(rejected, []);
});
