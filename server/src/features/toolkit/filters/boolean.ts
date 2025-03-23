import type z from "zod";
import { BooleanFilterSchema } from "./boolean.schema.ts";

export type BooleanFilter = z.infer<typeof BooleanFilterSchema>;

export function booleanFilter(value?: boolean, filter?: BooleanFilter) {
  if (value === undefined || filter === undefined) return true;
  return value === filter;
}
