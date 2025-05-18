import { publicProcedure } from "#features/app/trpc/root.ts";
import { getEstateInflationFromDomRf } from "./service/getFromDomRf.ts";
import { EstateInflationParamsSchema } from "./model.ts";

export const estate = {
  get: publicProcedure
    .input(EstateInflationParamsSchema)
    .query(async ({ input }) => {
      return await getEstateInflationFromDomRf(input);
    }),
};
