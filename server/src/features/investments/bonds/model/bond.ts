export type Bond = {
  isin: string;
  name: string;
  maturityDate?: Date;
  yield: number;
  rating: {
    tInvest?: number;
    bondFinder?: number;
  };
  nominal?: number;
  currency: string;
  sector: string;
  isFloater: boolean;
  hasAmortization: boolean;
  hasOffer: boolean;
  forQual: boolean;
};
