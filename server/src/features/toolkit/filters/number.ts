import type z from "zod";
import type { NumberFilterSchema } from "./number.schema.ts";

export type NumberFilter = z.infer<typeof NumberFilterSchema>;

export function numberFilter(value?: number, filter?: NumberFilter) {
  if (value === undefined || filter === undefined) return true;
  if (filter.min !== undefined && value < filter.min) return false;
  if (filter.max !== undefined && value > filter.max) return false;
  return true;
}
