<script lang="ts">
  import { onMount } from "svelte";
  import {
    getBonds,
    getDCAStrategy,
    getHiddenBonds,
    hideBond,
    setDCAStrategy,
    showBond,
    type Bond,
    type DCAStrategy,
    type DCAStrategyAsset,
  } from "$lib/common/api";
  import { getCurrentMonthName } from "$lib/common/date";
  import BondList from "./BondList.svelte";
  import BondListItem from "./BondListItem.svelte";
  import { SvelteSet } from "svelte/reactivity";

  let bonds = $state<Bond[]>([]);
  let hidden = $state(new SvelteSet<string>());
  let strategy = $state<DCAStrategy>({
    id: "bonds",
    currentMonthBudget: 0,
    assets: [],
  });

  let assetsMap = $derived(
    Object.fromEntries(strategy.assets.map((v) => [v.id, v]))
  );

  let [selectedBonds, visibleBonds, hiddenBonds] = $derived(
    bonds.reduce(
      (acc: Bond[][], bond) => {
        const isSelected = !!assetsMap[bond.isin];
        const isHidden = hidden.has(bond.isin);
        acc[isSelected ? 0 : isHidden ? 2 : 1].push(bond);
        return acc;
      },
      [[], [], []]
    )
  );

  onMount(async () => {
    [bonds, hidden, strategy] = await Promise.all([
      getBonds(),
      getHiddenBonds().then((v) => new SvelteSet(v)),
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
      {#each selectedBonds as bond (bond.isin)}
        <BondListItem
          {bond}
          strategyAsset={assetsMap[bond.isin]}
          onAddToStrategy={onAddBondToStrategy}
          onRemoveFromStrategy={onRemoveBondFromStrategy}
        />
      {/each}
      {#each visibleBonds as bond (bond.isin)}
        <BondListItem
          {bond}
          onAddToStrategy={onAddBondToStrategy}
          onRemoveFromStrategy={onRemoveBondFromStrategy}
          onHide={() => {
            hidden.add(bond.isin);
            hideBond({ id: bond.isin });
          }}
        />
      {/each}
      {#each hiddenBonds as bond (bond.isin)}
        <BondListItem
          {bond}
          isHidden
          onShow={() => {
            hidden.delete(bond.isin);
            showBond({ id: bond.isin });
          }}
        />
      {/each}
    </BondList>
  {/if}
</main>
