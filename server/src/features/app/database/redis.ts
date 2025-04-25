import { Redis } from "ioredis";
import ms from "ms";
import { env } from "process";

export const redis = new Redis({
  host: env.REDIS_HOST as string,
  port: Number.parseInt(env.REDIS_PORT as string),
  password: env.REDIS_PASSWORD as string,
  tls: {
    ca: await fetch("https://storage.yandexcloud.net/cloud-certs/CA.pem").then(
      (response) => response.text()
    ),
  },
});

export async function withCache<T>(
  key: string,
  duration: ms.StringValue,
  fn: () => Promise<T>
) {
  const cachedResponse = await redis.get(key);

  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }

  const response = await fn();

  redis.set(key, JSON.stringify(response), "EX", ms(duration) / 1000);
  return response;
}
