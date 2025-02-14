import { redis } from "../../../common/config/redis.ts";
import { dbKey, type DCAStrategy } from "../model.ts";

export async function getDCAStrategy(id: string): Promise<DCAStrategy | null> {
  const json = await redis.get(`${dbKey}:${id}`);
  return json && JSON.parse(json);
}
