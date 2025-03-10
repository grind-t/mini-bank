import { $, usePwsh } from "zx";

usePwsh();

const dockerTag = "cr.yandex/crp7scpfvjhcm2qi6hfh/mini-bank:latest";
const envKeys = [
  "REDIS_HOST",
  "REDIS_PORT",
  "REDIS_PASSWORD",
  "T_INVEST_READONLY_TOKEN",
  "T_INVEST_FULL_ACCESS_TOKEN",
  "PASSWORD",
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
]}`;
