export type Bond = {
  isin: string;
  name: string;
  maturityDate: Date;
  yield: number;
  rating: number;
};

export async function listBonds(): Promise<Bond[]> {
  const bondFinderResponse = await fetch(
    "https://raw.githubusercontent.com/bond-finder-lab/backend/refs/heads/master/docs/report-v1.json"
  );

  const data = (await bondFinderResponse.json()) as {
    date: string;
    cols: string[];
    rows: any[][];
  };

  const indicies = Object.fromEntries(data.cols.map((v, i) => [v, i]));

  return data.rows
    .reduce((acc: Bond[], row) => {
      const isRub = row[indicies["rub"]];
      const highRisk = row[indicies["high_risk"]];
      const hasOffer = row[indicies["has_offer"]];
      const isQual = row[indicies["qual"]];

      if (isRub && !highRisk && !hasOffer && !isQual) {
        acc.push({
          isin: row[indicies["isin"]],
          name: row[indicies["name"]],
          maturityDate: new Date(row[indicies["maturity_date"]]),
          yield: row[indicies["close_yield"]],
          rating: row[indicies["rating"]],
        });
      }

      return acc;
    }, [])
    .sort((a, b) => (b.yield || 0) - (a.yield || 0));
}
