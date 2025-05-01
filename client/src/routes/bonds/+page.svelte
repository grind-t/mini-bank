<script lang="ts">
  import { onMount } from "svelte";
  import { trpc } from "$lib/trpc";
  import type {
    Bond,
    BondListFilter,
    DCAStrategy,
    DCAStrategyAsset,
  } from "$lib/trpc";
  import BondList from "$lib/bonds/list/BondList.svelte";
  import CurrentMonthBudget from "$lib/bonds/dca/CurrentMonthBudget.svelte";
  import BondListRow from "$lib/bonds/list/BondListRow.svelte";
  import BondListHeader from "$lib/bonds/list/BondListHeader.svelte";
  import DCAButton from "$lib/bonds/dca/DCAButton.svelte";
  import { getUserContext } from "$lib/auth/context";
  import {
    getBondListFilter,
    setBondListFilter,
  } from "$lib/bonds/filters/storage";
  import { getBondListGroups } from "$lib/bonds/list/getBondListGroups";
  import BondListRowGroup from "$lib/bonds/list/BondListRowGroup.svelte";

  const user = getUserContext();

  let filter = $state<BondListFilter>(getBondListFilter());
  let bonds = $state<Bond[]>([]);
  let strategy = $state<DCAStrategy>({
    id: "bonds",
    currentMonthBudget: 0,
    assets: [],
  });

  const { bondGroups, restBonds } = $derived(
    getBondListGroups(bonds, strategy.assets)
  );

  onMount(async () => {
    if (user) {
      strategy = await trpc.dcaStrategies.get
        .query({ id: "bonds" })
        .then((v) => v ?? strategy);

      filter.whitelist = strategy.assets.map((v) => v.isin);
    }

    bonds = await trpc.bonds.list.query({ filter });
  });

  function onAddBondToStrategy(asset: DCAStrategyAsset) {
    strategy.assets.push(asset);
    trpc.dcaStrategies.set.mutate(strategy);
  }

  function onRemoveBondFromStrategy(asset: DCAStrategyAsset) {
    const idx = strategy.assets.findIndex((v) => v === asset);
    strategy.assets.splice(idx, 1);
    trpc.dcaStrategies.set.mutate(strategy);
  }
</script>

<main class="flex flex-col flex-1">
  {#if bonds.length}
    {#if user}
      <CurrentMonthBudget
        value={strategy.currentMonthBudget}
        onChange={(value) => {
          strategy.currentMonthBudget = value;
          trpc.dcaStrategies.set.mutate(strategy);
        }}
      />
    {/if}
    <BondList>
      <BondListHeader
        groups={bondGroups}
        {filter}
        onFilterChange={async (value) => {
          filter = value;
          bonds = await trpc.bonds.list.query({ filter });
          setBondListFilter(value);
        }}
      />
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
    </BondList>

    {#if user}
      <DCAButton />
    {/if}
  {/if}
</main>
