import z from "zod";

export const DateFilterSchema = z.object({
  gte: z.date().optional(),
  lte: z.date().optional(),
  unit: z
    .enum([
      "d",
      "D",
      "w",
      "M",
      "y",
      "h",
      "m",
      "s",
      "ms",
      "millisecond",
      "second",
      "minute",
      "hour",
      "day",
      "week",
      "month",
      "year",
      "date",
      "milliseconds",
      "seconds",
      "minutes",
      "hours",
      "days",
      "weeks",
      "months",
      "years",
      "dates",
    ])
    .optional(),
  exists: z.boolean().optional(),
});
