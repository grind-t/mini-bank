import { publicProcedure } from "../../../trpc.ts";
import { listBonds } from "./list.ts";

export const bonds = {
  list: publicProcedure.query(async () => {
    return await listBonds();
  }),
};
