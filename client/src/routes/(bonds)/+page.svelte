<script lang="ts">
  import { onMount } from "svelte";
  import {
    getBonds,
    getDCAStrategy,
    setDCAStrategy,
    type Bond,
    type DCAStrategy,
    type DCAStrategyAsset,
  } from "$lib/common/api";
  import { getCurrentMonthName } from "$lib/common/date";
  import BondList from "./BondList.svelte";
  import BondListItem from "./BondListItem.svelte";

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
      (acc, bond) => {
        const isSelected = !!assetsMap[bond.isin];
        acc[isSelected ? 0 : 1].push(bond);
        return acc;
      },
      [[] as Bond[], [] as Bond[]]
    )
  );

  onMount(async () => {
    [bonds, strategy] = await Promise.all([
      getBonds(),
      getDCAStrategy({ id: "bonds" }).then((v) => v ?? strategy),
    ]);
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
    <input
      value={strategy.currentMonthBudget || ""}
      class="input m-2"
      type="text"
      placeholder="Сумма на {getCurrentMonthName()}"
      onchange={(e) => {
        strategy.currentMonthBudget =
          Number.parseFloat(e.currentTarget.value) || 0;
        setDCAStrategy(strategy);
      }}
    />
    <BondList>
      {#each selectedBonds as bond}
        <BondListItem
          {bond}
          strategyAsset={assetsMap[bond.isin]}
          onAddToStrategy={onAddBondToStrategy}
          onRemoveFromStrategy={onRemoveBondFromStrategy}
        />
      {/each}
      {#each restBonds as bond}
        <BondListItem
          {bond}
          strategyAsset={assetsMap[bond.isin]}
          onAddToStrategy={onAddBondToStrategy}
          onRemoveFromStrategy={onRemoveBondFromStrategy}
        />
      {/each}
    </BondList>
  {/if}
</main>
