import dayjs from "dayjs";
import type { EstateInflation, EstateInflationParams } from "../model.ts";

const regionMap: Record<EstateInflationParams["region"], string> = {
  Moscow: "Город Москва",
  "Moscow Oblast": "Московская область",
  Russia: "Российская Федерация",
};

const estateClassMap: Record<EstateInflationParams["estateClass"], string> = {
  Comfort: "Типовой-Комфорт",
  Business: "Бизнес-Элитный",
};

export async function getEstateInflationFromDomRf(
  params: EstateInflationParams
): Promise<EstateInflation> {
  const payload = JSON.stringify({
    date_from: "2021.01.01",
    date_to: dayjs().format("YYYY.MM.DD"),
    regions: [
      {
        region: regionMap[params.region],
        estateClass: estateClassMap[params.estateClass],
      },
    ],
  });
  const requestUrl = "https://xn--d1aqf.xn--p1ai/api/v2/priceindex/living/mainchart/";

  let response: Response | undefined;
  let url = requestUrl;
  let cookie = "";

  for (let i = 0; i < 5; i += 1) {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "text/plain;charset=UTF-8",
        Origin: "https://xn--d1aqf.xn--p1ai",
        Referer: "https://xn--d1aqf.xn--p1ai/price-index/?inflation=y",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: payload,
      redirect: "manual",
    });

    const cookies = response.headers.getSetCookie?.();
    if (cookies?.length) {
      cookie = cookies.map((item) => item.split(";", 1)[0]).join("; ");
    }

    const location = response.headers.get("location");
    if ([301, 302, 303, 307, 308].includes(response.status) && location) {
      url = new URL(location, url).toString();
      continue;
    }

    break;
  }

  if (!response) {
    throw new Error("Dom.RF request failed without response");
  }

  if (!response.ok) {
    throw new Error(`Dom.RF request failed with status ${response.status}`);
  }

  const data = await response.json();
  const inflation = Object.values<any>(data.data.regions)[0].items;

  const startInflation = Number.parseFloat(inflation.at(-13).index_value);
  const preEndInflation = Number.parseFloat(inflation.at(-2).index_value);
  const endInflation = Number.parseFloat(inflation.at(-1).index_value);

  const year = ((endInflation - startInflation) / startInflation) * 100;
  const month = ((endInflation - preEndInflation) / preEndInflation) * 100;

  return {
    year,
    month,
  };
}
