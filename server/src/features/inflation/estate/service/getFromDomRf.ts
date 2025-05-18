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
  const response = await fetch(
    "https://xn--d1aqf.xn--p1ai/api/v2/priceindex/living/mainchart/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date_from: "2021.01.01",
        date_to: dayjs().format("YYYY.MM.DD"),
        regions: [
          {
            region: regionMap[params.region],
            estateClass: estateClassMap[params.estateClass],
          },
        ],
      }),
    }
  );

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
