import type z from "zod";
import { BooleanFilterSchema } from "./boolean.schema.ts";
import { isNullish } from "@grind-t/toolkit/nullish";

export type BooleanFilter = z.infer<typeof BooleanFilterSchema>;

export function booleanFilter(value?: boolean, filter?: BooleanFilter) {
  if (isNullish(filter)) return true;
  if (isNullish(value)) return !filter.exists;

  return filter.exists !== false && value === filter.eq;
}
