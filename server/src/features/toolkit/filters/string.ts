import type z from "zod";
import type { StringFilterSchema } from "./string.schema.ts";

export type StringFilter = z.infer<typeof StringFilterSchema>;

export function stringFilter(value?: string, filter?: StringFilter) {
  if (!filter || value === undefined) return true;

  const { include, exclude } = filter;

  if (include && !include.includes(value)) return false;
  if (exclude && exclude.includes(value)) return false;

  return true;
}
