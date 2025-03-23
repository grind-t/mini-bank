import dayjs from "dayjs";
import type { z } from "zod";
import type { DateFilterSchema } from "./date.schema.ts";

export type DateFilter = z.infer<typeof DateFilterSchema>;

export function dateFilter(value?: Date, filter?: DateFilter) {
  if (!filter || value === undefined) return true;

  const d = dayjs(value);
  const { min, max, unit } = filter;

  if (min && d.isBefore(min, unit)) return false;
  if (max && d.isAfter(max, unit)) return false;

  return true;
}
