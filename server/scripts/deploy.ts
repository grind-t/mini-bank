import { $, usePwsh } from "zx";

usePwsh();

const dockerTag = "cr.yandex/crp7scpfvjhcm2qi6hfh/mini-bank:latest";

await $`docker build --provenance false -t ${dockerTag} .`;
await $`docker push ${dockerTag}`;
await $`yc serverless container revision deploy ${[
  "--container-id",
  "bbac3tn498gvd9kvthnn",
  `--image`,
  dockerTag,
  "--service-account-id",
  "ajec3fo74rnuq5q72g5j",
]}`;
