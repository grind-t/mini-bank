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
