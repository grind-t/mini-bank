import { BooleanFilterSchema } from "#src/features/filters/boolean.schema.ts";
import { DateFilterSchema } from "#src/features/filters/date.schema.ts";
import { NumberFilterSchema } from "#src/features/filters/number.schema.ts";
import { StringFilterSchema } from "#src/features/filters/string.schema.ts";
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
