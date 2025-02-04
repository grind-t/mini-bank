type BondFinderResponse = {
  date: string;
  cols: string[];
  rows: (string | number | number[])[][];
};

type Bond = {
  isin: string;
  name: string;
  maturityDate: Date;
  closeYield: number;
  rub: boolean;
  rating: number;
};

export async function getBonds() {
  const bondFinderResponse = await fetch(
    "https://raw.githubusercontent.com/bond-finder-lab/backend/refs/heads/master/docs/report-v1.json",
  );

  const data = await bondFinderResponse.json() as BondFinderResponse;

  const indicies = data.cols.reduce((acc, name, i) => {
    acc[name] = i;
    return acc;
  }, {} as Record<string, number>);

  return data.rows.reduce((acc, row) => {
    const highRisk = row[indicies["high_risk"]];
    const hasOffer = row[indicies["has_offer"]];
    const isQual = row[indicies["qual"]];

    if (!highRisk && !hasOffer && !isQual) {
      acc.push({
        isin: row[indicies["isin"]] as string,
        name: row[indicies["name"]] as string,
        maturityDate: new Date(row[indicies["maturity_date"]] as string),
        closeYield: row[indicies["close_yield"]] as number,
        rub: Boolean(row[indicies["rub"]]),
        rating: row[indicies["rating"]] as number,
      });
    }

    return acc;
  }, [] as Bond[]).sort((a, b) => a.rating - b.rating);
}
