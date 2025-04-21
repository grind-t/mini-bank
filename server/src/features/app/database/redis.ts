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

export async function withCache<T>(
  key: string,
  {
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  }: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  },
  fn: () => Promise<T>
) {
  const cachedResponse = await redis.get(key);

  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }

  const response = await fn();

  redis.set(
    key,
    JSON.stringify(response),
    "EX",
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds
  );
  return response;
}
