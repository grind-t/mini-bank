import { z } from "zod";

export const NumberFilterSchema = z.object({
  gte: z.number().optional(),
  lte: z.number().optional(),
  exists: z.boolean().optional(),
});
