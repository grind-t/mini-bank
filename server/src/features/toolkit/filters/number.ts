import type z from "zod";
import type { NumberFilterSchema } from "./number.schema.ts";

export type NumberFilter = z.infer<typeof NumberFilterSchema>;

export function numberFilter(value?: number, filter?: NumberFilter) {
  if (!filter || value === undefined) return true;

  const { min, max } = filter;

  if (min && value < min) return false;
  if (max && value > max) return false;

  return true;
}
