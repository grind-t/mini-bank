import { $, usePwsh } from "zx";

usePwsh();

const dockerTag = "cr.yandex/crpucu00vnjnitf4u599/mini-bank:latest";
const envKeys = [
  "REDIS_HOST",
  "REDIS_PORT",
  "REDIS_PASSWORD",
  "T_INVEST_READONLY_TOKEN",
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET",
  "AUTH_SECRET",
];

await $`docker build --provenance false -t ${dockerTag} .`;
await $`docker push ${dockerTag}`;
await $`yc serverless container revision deploy ${[
  "--container-id",
  "bbac3tn498gvd9kvthnn",
  `--image`,
  dockerTag,
  "--service-account-id",
  "ajec3fo74rnuq5q72g5j",
  "--environment",
  envKeys.map((key) => `${key}=${process.env[key]}`).join(","),
  "--memory",
  "512MB",
  "--execution-timeout",
  "10s",
  "--concurrency",
  "8",
  "--min-instances",
  "1",
]}`;
