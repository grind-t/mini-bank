import type z from "zod";
import type { StringFilterSchema } from "./string.schema.ts";

export type StringFilter = z.infer<typeof StringFilterSchema>;

export function stringFilter(value?: string, filter?: StringFilter) {
  if (filter === undefined) return true;
  return filter.includes(value as string);
}
