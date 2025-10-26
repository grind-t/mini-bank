import { type Bond, listAllRussianBonds } from "@grind-t/russian-bonds";
import { env } from "process";
import { withCache } from "#app/database/redis.ts";

export async function listAllBonds(): Promise<Bond[]> {
  return withCache("bonds_cache", "30m", async () => {
    const bonds = await listAllRussianBonds(
      env.T_INVEST_READONLY_TOKEN as string
    );
    return bonds.sort(
      (a, b) =>
        Math.max(b.ytm || 0, b.eytm || 0) - Math.max(a.ytm || 0, a.eytm || 0)
    );
  });
}
