import { Redis } from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST as string,
  port: Number.parseInt(process.env.REDIS_PORT as string),
  password: process.env.REDIS_PASSWORD as string,
  tls: {
    ca: await fetch("https://storage.yandexcloud.net/cloud-certs/CA.pem").then(
      (response) => response.text()
    ),
  },
});

export const cacheMinutes = (v: number) => v * 60;
export const cacheHours = (v: number) => cacheMinutes(v) * 60;

export async function withCache<T>(
  key: string,
  seconds: number,
  fn: () => Promise<T>
) {
  const cachedResponse = await redis.get(key);

  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }

  const response = await fn();

  redis.set(key, JSON.stringify(response), "EX", seconds);
  return response;
}
