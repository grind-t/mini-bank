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
      const groupId = bond.emitent?.id || crypto.randomUUID();
      const group = bondGroupsByEmitent.get(groupId) ?? {
        id: groupId,
        selectedBonds: [],
        unselectedBonds: [],
      };

      group.selectedBonds.push({ value: bond, strategyAsset: asset });
      bondGroupsByEmitent.set(groupId, group);
    }
  }

  for (const bond of bonds) {
    if (assetsByIsin[bond.isin]) continue;

    const groupId = bond.emitent?.id;
    const group = groupId && bondGroupsByEmitent.get(groupId);

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
