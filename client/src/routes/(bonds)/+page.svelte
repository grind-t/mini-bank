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
  import { toRecord } from "@grind-t/toolkit";

  let filter = $state({
    whitelist: [] as string[],
    yield: {
      gte: 22 as number | undefined,
      lte: 32 as number | undefined,
    },
    rating: {
      tInvest: {
        gte: 1 as number | undefined,
      },
      bondFinder: {
        gte: 4 as number | undefined,
      },
    },
    maturityDate: {
      lte: dayjs().add(2, "years").toDate() as Date | undefined,
      unit: "day",
    },
    currency: {
      in: ["rub"],
    },
    sector: {
      nin: ["real_estate"],
    },
    hasAmortization: { eq: false },
    hasOffer: { eq: false },
    forQual: { eq: false },
  } satisfies BondListFilter);

  let bonds = $state<Bond[]>([]);
  let strategy = $state<DCAStrategy>({
    id: "bonds",
    currentMonthBudget: 0,
    assets: [],
  });

  let assetsMap = $derived(toRecord(strategy.assets, (v) => v.id));

  let [selectedBonds, restBonds] = $derived(
    bonds.reduce(
      (acc: Bond[][], bond) => {
        const { isin, rating } = bond;

        if (assetsMap[isin]) {
          acc[0].push(bond);
        } else if (rating.tInvest !== 1 || rating.bondFinder) {
          acc[1].push(bond);
        }

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
