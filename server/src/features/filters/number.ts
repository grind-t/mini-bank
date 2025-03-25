import type z from "zod";
import type { NumberFilterSchema } from "./number.schema.ts";
import { isNullish } from "../toolkit/isNullish.ts";

export type NumberFilter = z.infer<typeof NumberFilterSchema>;

export function numberFilter(value?: number, filter?: NumberFilter) {
  if (isNullish(filter)) return true;
  if (isNullish(value)) return !filter.exists;

  return (
    filter.exists !== false &&
    (isNullish(filter.gte) || value >= filter.gte) &&
    (isNullish(filter.lte) || value <= filter.lte)
  );
}
