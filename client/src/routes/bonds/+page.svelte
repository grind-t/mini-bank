<script lang="ts">
  import { trpc } from "$lib/trpc";
  import type { Bond, BondListFilter, DCAStrategy } from "$lib/trpc";
  import CurrentMonthBudget from "$lib/bonds/dca/CurrentMonthBudget.svelte";
  import DCAButton from "$lib/bonds/dca/DCAButton.svelte";
  import { getUserContext } from "$lib/auth/context";
  import {
    getBondListFilter,
    setBondListFilter,
  } from "$lib/bonds/filters/storage";
  import GenericLoader from "$lib/ui/GenericLoader.svelte";
  import GenericError from "$lib/ui/GenericError.svelte";
  import BondList from "$lib/bonds/list/BondList.svelte";

  const user = getUserContext();

  let bondsPromise = $state<Promise<Bond[]>>();
  let filter = $state<BondListFilter>(getBondListFilter());
  let strategy = $state<DCAStrategy>();

  function fetchBonds() {
    const whitelist = strategy?.assets.map((v) => v.isin);

    bondsPromise = trpc.bonds.list.query({
      filter: {
        ...filter,
        whitelist,
      },
    });

    return bondsPromise;
  }

  async function fetchDCAStrategy() {
    if (!user) return;

    strategy = (await trpc.dcaStrategies.get.query({ id: "bonds" })) ?? {
      id: "bonds",
      currentMonthBudget: 0,
      assets: [],
    };

    return strategy;
  }
</script>

<main class="flex flex-col flex-1">
  {#await fetchDCAStrategy().then(fetchBonds)}
    <GenericLoader />
  {:then}
    {#if strategy}
      <CurrentMonthBudget
        value={strategy.currentMonthBudget}
        onChange={(value) => {
          if (!strategy) return;
          strategy.currentMonthBudget = value;
          trpc.dcaStrategies.set.mutate(strategy);
        }}
      />
    {/if}

    {#await bondsPromise}
      <GenericLoader />
    {:then bonds}
      <BondList
        {bonds}
        {filter}
        {strategy}
        onFilterChange={(value) => {
          filter = value;
          setBondListFilter(value);
          fetchBonds();
        }}
        onAddBondToStrategy={async (asset) => {
          if (!strategy) return;
          strategy.assets.push(asset);
          await trpc.dcaStrategies.set.mutate(strategy);
          fetchDCAStrategy();
        }}
        onRemoveBondFromStrategy={async (asset) => {
          if (!strategy) return;
          const idx = strategy.assets.findIndex((v) => v === asset);
          strategy.assets.splice(idx, 1);
          await trpc.dcaStrategies.set.mutate(strategy);
          fetchDCAStrategy();
        }}
      />

      {#if strategy}
        <DCAButton />
      {/if}
    {:catch error}
      <GenericError {error} />
    {/await}
  {:catch error}
    <GenericError {error} />
  {/await}
</main>
