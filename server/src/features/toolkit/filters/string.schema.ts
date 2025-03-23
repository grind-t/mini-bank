import { z } from "zod";

export const StringFilterSchema = z.object({
  include: z.array(z.string()).optional(),
  exclude: z.array(z.string()).optional(),
});
