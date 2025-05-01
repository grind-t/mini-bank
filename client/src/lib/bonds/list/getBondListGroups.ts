import type { Bond, DCAStrategyAsset } from "$lib/trpc";
import { toRecord } from "@grind-t/toolkit/array";

export type SelectedBond = {
  value: Bond;
  strategyAsset: DCAStrategyAsset;
};

export type BondGroup = {
  id: string;
  selectedBonds: SelectedBond[];
  unselectedBonds: Bond[];
};

export function getBondListGroups(
  bonds: Bond[],
  assets: DCAStrategyAsset[]
): { bondGroups: BondGroup[]; restBonds: Bond[] } {
  const assetsByIsin = toRecord(assets, (v) => v.isin);
  const bondGroupsByEmitent = new Map<string, BondGroup>();
  const restBonds: Bond[] = [];

  for (const bond of bonds) {
    const asset = assetsByIsin[bond.isin];

    if (asset) {
      const group = bondGroupsByEmitent.get(bond.emitentId) ?? {
        id: bond.emitentId,
        selectedBonds: [],
        unselectedBonds: [],
      };

      group.selectedBonds.push({ value: bond, strategyAsset: asset });
      bondGroupsByEmitent.set(bond.emitentId, group);
    }
  }

  for (const bond of bonds) {
    if (assetsByIsin[bond.isin]) continue;

    const group = bondGroupsByEmitent.get(bond.emitentId);

    if (group) {
      group.unselectedBonds.push(bond);
    } else {
      restBonds.push(bond);
    }
  }

  return {
    bondGroups: Array.from(bondGroupsByEmitent.values()),
    restBonds,
  };
}
