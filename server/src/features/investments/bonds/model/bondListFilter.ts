import { z } from "zod";
import { BooleanFilterSchema } from "#features/filters/boolean.schema.ts";
import { DateFilterSchema } from "#features/filters/date.schema.ts";
import { NumberFilterSchema } from "#features/filters/number.schema.ts";
import { StringFilterSchema } from "#features/filters/string.schema.ts";

export const BondListFilterSchema = z.object({
  whitelist: z.array(z.string()).optional(),
  blacklist: z.array(z.string()).optional(),
  yield: z
    .object({
      effective: NumberFilterSchema.optional(),
      prevWAPrice: NumberFilterSchema.optional(),
    })
    .optional(),
  rating: z
    .object({
      tInvest: NumberFilterSchema.optional(),
      AKRA: NumberFilterSchema.optional(),
      NKR: NumberFilterSchema.optional(),
      EXPERT_RA: NumberFilterSchema.optional(),
      NRA: NumberFilterSchema.optional(),
    })
    .optional(),
  nominal: NumberFilterSchema.optional(),
  maturityDate: DateFilterSchema.optional(),
  currency: StringFilterSchema.optional(),
  sector: StringFilterSchema.optional(),
  hasAmortization: BooleanFilterSchema.optional(),
  hasOffer: BooleanFilterSchema.optional(),
  forQual: BooleanFilterSchema.optional(),
});

export type BondListFilter = z.infer<typeof BondListFilterSchema>;
