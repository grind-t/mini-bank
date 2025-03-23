import { BooleanFilterSchema } from "#src/features/toolkit/filters/boolean.schema.ts";
import { DateFilterSchema } from "#src/features/toolkit/filters/date.schema.ts";
import { NumberFilterSchema } from "#src/features/toolkit/filters/number.schema.ts";
import { StringFilterSchema } from "#src/features/toolkit/filters/string.schema.ts";
import { z } from "zod";

export const BondListFilterSchema = z.object({
  whitelist: z.array(z.string()).optional(),
  blacklist: z.array(z.string()).optional(),
  yield: NumberFilterSchema.optional(),
  rating: z
    .object({
      tInvest: NumberFilterSchema.optional(),
      bondFinder: NumberFilterSchema.optional(),
    })
    .optional(),
  maturityDate: DateFilterSchema.optional(),
  currency: StringFilterSchema.optional(),
  sector: StringFilterSchema.optional(),
  hasOffer: BooleanFilterSchema.optional(),
  forQual: BooleanFilterSchema.optional(),
});
