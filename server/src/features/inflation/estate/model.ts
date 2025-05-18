import { z } from "zod";

export const EstateInflationParamsSchema = z.object({
  region: z.enum(["Moscow", "Moscow Oblast", "Russia"]),
  estateClass: z.enum(["Comfort", "Business"]),
});

export type EstateInflationParams = z.infer<typeof EstateInflationParamsSchema>;

export type EstateInflation = {
  year: number;
  month: number;
};
