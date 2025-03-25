import { z } from "zod";

export const StringFilterSchema = z.object({
  in: z.array(z.string()).optional(),
  nin: z.array(z.string()).optional(),
  exists: z.boolean().optional(),
});
