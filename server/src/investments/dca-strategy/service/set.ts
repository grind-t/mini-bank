import { redis } from "../../../common/config/redis.ts";
import { dbKey, type DCAStrategy } from "../model.ts";

export async function setDCAStrategy(value: DCAStrategy): Promise<void> {
  await redis
    .multi()
    .set(`${dbKey}:${value.id}`, JSON.stringify(value))
    .sadd(value.id)
    .exec();
}
