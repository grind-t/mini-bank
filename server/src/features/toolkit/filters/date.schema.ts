import type { OpUnitType } from "dayjs";
import z from "zod";

export const DateFilterSchema = z.object({
  min: z.date().optional(),
  max: z.date().optional(),
  unit: z
    .string()
    .transform((v) => v as OpUnitType)
    .optional(),
});
