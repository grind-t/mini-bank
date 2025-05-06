<script lang="ts">
  import type {
    Bond,
    BondListFilter,
    DCAStrategy,
    DCAStrategyAsset,
  } from "$lib/trpc";
  import BondListContainer from "./BondListContainer.svelte";
  import BondListHeader from "./BondListHeader.svelte";
  import BondListRow from "./BondListRow.svelte";
  import BondListRowGroup from "./BondListRowGroup.svelte";
  import { getBondListGroups } from "./getBondListGroups";

  let {
    bonds = [],
    filter,
    strategy,
    onFilterChange,
    onAddBondToStrategy,
    onRemoveBondFromStrategy,
  }: {
    bonds: Bond[] | undefined;
    filter: BondListFilter;
    strategy?: DCAStrategy;
    onFilterChange: (filter: BondListFilter) => void;
    onAddBondToStrategy?: (asset: DCAStrategyAsset) => void;
    onRemoveBondFromStrategy?: (asset: DCAStrategyAsset) => void;
  } = $props();

  const { bondGroups, restBonds } = $derived(
    getBondListGroups(bonds, strategy?.assets || [])
  );
</script>

<BondListContainer>
  <BondListHeader groups={bondGroups} {filter} {onFilterChange} />
  {#each bondGroups as group (group.id)}
    <BondListRowGroup
      {group}
      {onAddBondToStrategy}
      {onRemoveBondFromStrategy}
    />
  {/each}
  {#each restBonds as bond (bond.isin)}
    <BondListRow
      {bond}
      onAddToStrategy={onAddBondToStrategy}
      onRemoveFromStrategy={onRemoveBondFromStrategy}
    />
  {/each}
</BondListContainer>
