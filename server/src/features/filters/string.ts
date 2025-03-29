import type z from "zod";
import type { StringFilterSchema } from "./string.schema.ts";
import { isNullish } from "@grind-t/toolkit";

export type StringFilter = z.infer<typeof StringFilterSchema>;

export function stringFilter(value?: string, filter?: StringFilter): boolean {
  if (isNullish(filter)) return true;
  if (isNullish(value)) return !filter.exists;

  return (
    filter.exists !== false &&
    (isNullish(filter.in) || filter.in.includes(value)) &&
    (isNullish(filter.nin) || !filter.nin.includes(value))
  );
}
