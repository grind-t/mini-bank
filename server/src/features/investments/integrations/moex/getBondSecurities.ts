import { getMoexSecurities, type MoexSecurity } from "./getSecurities.ts";

export async function getMoexBondSecurities(): Promise<MoexSecurity[]> {
  let securities: MoexSecurity[] = [];
  let start = 0;

  while (true) {
    const chunk = await getMoexSecurities({
      engine: "stock",
      market: "bonds",
      is_trading: 1,
      start,
      limit: 100,
    });

    securities.push(...chunk);
    start += chunk.length;

    if (chunk.length < 100) {
      return securities;
    }
  }
}
