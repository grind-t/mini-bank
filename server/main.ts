import { getBonds } from "./lib/bonds.ts";
import { tbankFetch } from "./lib/tbank_api.ts";

const BONDS_ROUTE = new URLPattern({ pathname: "/bonds" });

Deno.serve(async (req) => {
  if (BONDS_ROUTE.test(req.url)) {
    const bonds = await tbankFetch(
      "tinkoff.public.invest.api.contract.v1.InstrumentsService/Bonds",
      "POST",
      {
        instrumentStatus: "INSTRUMENT_STATUS_BASE",
        instrumentExchange: "INSTRUMENT_EXCHANGE_UNSPECIFIED",
      },
    );
    return new Response(JSON.stringify(await bonds.json(), null, 2));
    //return new Response(JSON.stringify(await getBonds(), null, 2));
  }

  return new Response("Not found", {
    status: 404,
  });
});
