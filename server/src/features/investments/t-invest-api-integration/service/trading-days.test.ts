import { describe, it, mock } from "node:test";
import assert from "node:assert";

const getMoexDailyTable = mock.fn<() => Promise<any[]>>();

mock.module("#features/investments/moex-integration/daily-table.ts", {
  namedExports: {
    getMoexDailyTable,
  },
});

describe("getCurrentMonthTradingDays", async () => {
  const { getCurrentMonthTradingDays } = await import("./trading-days.ts");

  it("should return correct count for a month with no MOEX holidays", async (t) => {
    // Mock current date to February 1, 2024 (month with 21 weekdays)
    const feb1 = new Date("2024-02-01");
    t.mock.timers.enable({ apis: ["Date"], now: feb1 });

    // Mock MOEX data to return no holidays
    getMoexDailyTable.mock.mockImplementationOnce(async () => []);

    const result = await getCurrentMonthTradingDays();
    assert.strictEqual(result, 21);
  });

  it("should exclude MOEX non-working days on weekdays", async (t) => {
    const feb1 = new Date("2024-02-01");
    t.mock.timers.enable({ apis: ["Date"], now: feb1 });

    // Mock MOEX data with a holiday on 2024-02-23 (Friday)
    getMoexDailyTable.mock.mockImplementationOnce(async () => [
      { date: "2024-02-23", is_work_day: false },
    ]);

    const result = await getCurrentMonthTradingDays();
    assert.strictEqual(result, 20); // 21 weekdays - 1 holiday
  });

  it("should ignore MOEX non-working days on weekends", async (t) => {
    const feb1 = new Date("2024-02-01");
    t.mock.timers.enable({ apis: ["Date"], now: feb1 });

    // Mock MOEX data with a holiday on 2024-02-03 (Saturday)
    getMoexDailyTable.mock.mockImplementationOnce(async () => [
      { date: "2024-02-03", is_work_day: false },
    ]);

    const result = await getCurrentMonthTradingDays();
    assert.strictEqual(result, 21); // Weekend holidays don't affect count
  });
});
