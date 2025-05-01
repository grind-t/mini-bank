<script lang="ts">
  import type { DCAStrategyAsset } from "$lib/trpc";
  import BondListRow from "./BondListRow.svelte";
  import BondListRowConnection from "./BondListRowConnection.svelte";
  import type { BondGroup } from "./getBondListGroups";

  let {
    group,
    onAddBondToStrategy,
    onRemoveBondFromStrategy,
  }: {
    group: BondGroup;
    onAddBondToStrategy?: (asset: DCAStrategyAsset) => void;
    onRemoveBondFromStrategy?: (asset: DCAStrategyAsset) => void;
  } = $props();

  let rowHeights = $state<number[]>([]);
</script>

<div class="relative">
  {#each group.selectedBonds as { value, strategyAsset }, i (value.isin)}
    {@const rowIndex = i}
    <BondListRowConnection {rowIndex} {rowHeights} />
    <BondListRow
      bind:offsetHeight={rowHeights[rowIndex]}
      bond={value}
      {strategyAsset}
      onAddToStrategy={onAddBondToStrategy}
      onRemoveFromStrategy={onRemoveBondFromStrategy}
    />
  {/each}
  {#each group.unselectedBonds as bond, i (bond.isin)}
    {@const rowIndex = group.selectedBonds.length + i}
    <BondListRowConnection {rowIndex} {rowHeights} />
    <BondListRow
      bind:offsetHeight={rowHeights[rowIndex]}
      {bond}
      onAddToStrategy={onAddBondToStrategy}
      onRemoveFromStrategy={onRemoveBondFromStrategy}
    />
  {/each}
</div>
