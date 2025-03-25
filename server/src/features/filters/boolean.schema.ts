import { z } from "zod";

export const BooleanFilterSchema = z.object({
  eq: z.boolean().optional(),
  exists: z.boolean().optional(),
});
