import { Redis } from "ioredis";
import { readFile } from "fs/promises";

export const redis = new Redis({
  host: process.env.REDIS_HOST as string,
  port: Number.parseInt(process.env.REDIS_PORT as string),
  password: process.env.REDIS_PASSWORD as string,
  tls: {
    ca: await readFile(`${process.env.HOME}/.redis/YandexInternalRootCA.crt`),
  },
});
