import { z } from "zod";
import { publicProcedure } from "#app/trpc/root.ts";
import { listBonds } from "./service/list.ts";
import { BondListFilterSchema } from "./model/bondListFilter.ts";

export const bonds = {
  list: publicProcedure
    .input(
      z.object({
        filter: BondListFilterSchema.optional(),
      })
    )
    .query(async ({ input }) => {
      return await listBonds(input.filter);
    }),
};
