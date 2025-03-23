import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../../../trpc.ts";
import { hideBond } from "./service/hide.ts";
import { listBonds } from "./service/list.ts";
import { getHiddenBonds } from "./service/getHidden.ts";
import { showBond } from "./service/show.ts";
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
  hide: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await hideBond(input.id);
    }),
  show: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await showBond(input.id);
    }),
  getHidden: publicProcedure.query(async () => {
    return await getHiddenBonds();
  }),
};
