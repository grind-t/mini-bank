import { z } from "zod";

export const NumberFilterSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
});
