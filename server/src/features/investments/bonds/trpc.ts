import { z } from "zod";
import { publicProcedure } from "#src/trpc.ts";
import { listBonds } from "./service/list.ts";
import { BondListFilterSchema } from "./service/list.schema.ts";

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
