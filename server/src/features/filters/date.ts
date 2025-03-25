import dayjs from "dayjs";
import type { z } from "zod";
import type { DateFilterSchema } from "./date.schema.ts";
import { isNullish } from "../toolkit/isNullish.ts";

export type DateFilter = z.infer<typeof DateFilterSchema>;

export function dateFilter(value?: Date, filter?: DateFilter) {
  if (isNullish(filter)) return true;
  if (isNullish(value)) return !filter.exists;

  const d = dayjs(value);

  return (
    filter.exists !== false &&
    (isNullish(filter.gte) || !d.isBefore(filter.gte, filter.unit)) &&
    (isNullish(filter.lte) || !d.isAfter(filter.lte, filter.unit))
  );
}
