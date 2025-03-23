<script lang="ts">
  import { onMount } from "svelte";
  import {
    getBonds,
    getDCAStrategy,
    setDCAStrategy,
    type Bond,
    type BondListFilter,
    type DCAStrategy,
    type DCAStrategyAsset,
  } from "$lib/common/api";
  import BondList from "./BondList.svelte";
  import BondListItem from "./BondListItem.svelte";
  import CurrentMonthBudget from "./CurrentMonthBudget.svelte";
  import dayjs from "dayjs";

  let filter = $state({
    whitelist: [] as string[],
    yield: {
      min: 22 as number | undefined,
      max: 32 as number | undefined,
    },
    rating: {
      tInvest: {
        min: 2 as number | undefined,
      },
      bondFinder: {
        min: 4 as number | undefined,
      },
    },
    maturityDate: {
      max: dayjs().add(2, "years").toDate() as Date | undefined,
    },
    currency: {
      include: ["rub"],
    },
    sector: {
      exclude: ["real_estate"],
    },
    hasOffer: false,
    forQual: false,
  } satisfies BondListFilter);

  let bonds = $state<Bond[]>([]);
  let strategy = $state<DCAStrategy>({
    id: "bonds",
    currentMonthBudget: 0,
    assets: [],
  });

  let assetsMap = $derived(
    Object.fromEntries(strategy.assets.map((v) => [v.id, v]))
  );

  let [selectedBonds, restBonds] = $derived(
    bonds.reduce(
      (acc: Bond[][], bond) => {
        acc[assetsMap[bond.isin] ? 0 : 1].push(bond);
        return acc;
      },
      [[], []]
    )
  );

  onMount(async () => {
    strategy = (await getDCAStrategy({ id: "bonds" })) ?? strategy;
    filter.whitelist = strategy.assets.map((v) => v.id);
    bonds = await getBonds({ filter });
  });

  function onAddBondToStrategy(asset: DCAStrategyAsset) {
    strategy.assets.push(asset);
    setDCAStrategy(strategy);
  }

  function onRemoveBondFromStrategy(asset: DCAStrategyAsset) {
    const idx = strategy.assets.findIndex((v) => v === asset);
    strategy.assets.splice(idx, 1);
    setDCAStrategy(strategy);
  }
</script>

<main class="flex flex-col flex-1">
  {#if bonds.length}
    <CurrentMonthBudget
      value={strategy.currentMonthBudget}
      onChange={(value) => {
        strategy.currentMonthBudget = value;
        setDCAStrategy(strategy);
      }}
    />
    <BondList>
      {#each selectedBonds as bond (bond.isin)}
        <BondListItem
          {bond}
          strategyAsset={assetsMap[bond.isin]}
          onAddToStrategy={onAddBondToStrategy}
          onRemoveFromStrategy={onRemoveBondFromStrategy}
        />
      {/each}
      {#each restBonds as bond (bond.isin)}
        <BondListItem
          {bond}
          onAddToStrategy={onAddBondToStrategy}
          onRemoveFromStrategy={onRemoveBondFromStrategy}
        />
      {/each}
    </BondList>
  {/if}
</main>
