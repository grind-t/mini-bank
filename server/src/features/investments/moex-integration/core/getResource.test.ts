import assert from "assert";
import { it } from "node:test";
import { getMoexResource } from "./getResource.ts";

it("should build URL with given path, block and params", () => {
  const url = getMoexResource("engines/stock", "marketdata", {
    ticker: "SBER",
    quantity: 100,
  });
  assert.strictEqual(url.origin, "https://iss.moex.com");
  assert.strictEqual(url.pathname, "/iss/engines/stock");
  assert.strictEqual(url.searchParams.get("ticker"), "SBER");
  assert.strictEqual(url.searchParams.get("quantity"), "100");
  assert.strictEqual(url.searchParams.get("iss.meta"), "off");
  assert.strictEqual(url.searchParams.get("iss.only"), "marketdata");
});

it("should ignore undefined parameters", () => {
  const url = getMoexResource("engines/stock", "marketdata", {
    ticker: undefined,
    active: "true",
  });
  assert.strictEqual(url.searchParams.has("ticker"), false);
  assert.strictEqual(url.searchParams.get("active"), "true");
});

it("should work with no params provided", () => {
  const url = getMoexResource("engines/bonds", "marketdata");
  assert.strictEqual(url.searchParams.get("iss.meta"), "off");
  assert.strictEqual(url.searchParams.get("iss.only"), "marketdata");
  assert.strictEqual(
    url.searchParams.toString(),
    "iss.meta=off&iss.only=marketdata"
  );
});
