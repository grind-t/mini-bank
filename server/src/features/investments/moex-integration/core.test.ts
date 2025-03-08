import { describe, it } from "node:test";
import assert from "node:assert";
import { moexFetch } from "./core.ts";

const mockFetchResponse = (data: any) => async () =>
  ({ json: async () => data } as Response);

describe("moexFetch", () => {
  it("should fetch and transform data correctly", async (t) => {
    t.mock.method(
      global,
      "fetch",
      mockFetchResponse({
        block: {
          columns: ["column1", "column2"],
          data: [
            ["value1", "value2"],
            ["value3", "value4"],
          ],
        },
      })
    );

    const result = await moexFetch<{ column1: string; column2: string }>(
      "path",
      "block"
    );

    assert.deepStrictEqual(result, [
      { column1: "value1", column2: "value2" },
      { column1: "value3", column2: "value4" },
    ]);
  });

  it("should handle empty data", async (t) => {
    t.mock.method(
      global,
      "fetch",
      mockFetchResponse({ block: { columns: [], data: [] } })
    );

    const result = await moexFetch<{}>("path", "block", { param1: "value" });

    assert.deepStrictEqual(result, []);
  });
});
