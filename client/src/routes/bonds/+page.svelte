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
  import dayjs from "dayjs";
  import { toRecord } from "@grind-t/toolkit/array";
  import BondListRow from "$lib/bonds/list/BondListRow.svelte";
  import BondListHeader from "$lib/bonds/list/BondListHeader.svelte";
  import DCAButton from "$lib/bonds/dca/DCAButton.svelte";
  import { getUserContext } from "$lib/auth/context";
  import {
    getBondListFilter,
    setBondListFilter,
  } from "$lib/bonds/filters/storage";

  const user = getUserContext();

  let filter = $state<BondListFilter>(getBondListFilter());
  let bonds = $state<Bond[]>([]);
  let strategy = $state<DCAStrategy>({
    id: "bonds",
    currentMonthBudget: 0,
    assets: [],
  });

  let assetsMap = $derived(toRecord(strategy.assets, (v) => v.isin));

  let [selectedBonds, restBonds] = $derived(
    bonds.reduce(
      (acc: Bond[][], bond) => {
        const { isin } = bond;

        if (assetsMap[isin]) {
          acc[0].push(bond);
        } else {
          acc[1].push(bond);
        }

        return acc;
      },
      [[], []]
    )
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
        {selectedBonds}
        {filter}
        onFilterChange={async (value) => {
          filter = value;
          bonds = await trpc.bonds.list.query({ filter });
          setBondListFilter(value);
        }}
      />
      {#each selectedBonds as bond (bond.isin)}
        <BondListRow
          {bond}
          strategyAsset={assetsMap[bond.isin]}
          onAddToStrategy={onAddBondToStrategy}
          onRemoveFromStrategy={onRemoveBondFromStrategy}
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
