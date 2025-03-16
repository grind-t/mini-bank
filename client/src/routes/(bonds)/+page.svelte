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
  import { getCurrentMonthName, getDistanceInYears } from "$lib/common/date";
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

  let minYield = $state(23);
  let minRating = $state(3);
  let maxDistance = $state(2);

  let assetsMap = $derived(
    Object.fromEntries(strategy.assets.map((v) => [v.id, v]))
  );

  let [selectedBonds, visibleBonds, hiddenBonds] = $derived(
    bonds.reduce(
      (acc: Bond[][], bond) => {
        const isSelected = !!assetsMap[bond.isin];
        if (isSelected) {
          acc[0].push(bond);
          return acc;
        }

        const isHidden = hidden.has(bond.isin);
        if (isHidden) {
          acc[2].push(bond);
          return acc;
        }

        const isInFilter =
          bond.yield >= minYield &&
          bond.rating >= minRating &&
          getDistanceInYears(new Date(bond.maturityDate)) <= maxDistance;

        if (isInFilter) {
          acc[1].push(bond);
        }

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
        e.preventDefault();
        strategy.currentMonthBudget = Number(e.currentTarget.value) || 0;
        setDCAStrategy(strategy);
      }}
    />
    <input
      value={minYield}
      class="input m-2"
      type="text"
      placeholder="Минимальная доходность"
      onchange={(e) => {
        e.preventDefault();
        minYield = Number(e.currentTarget.value) || 0;
      }}
    />
    <input
      value={minRating}
      class="input m-2"
      type="text"
      placeholder="Минимальный рейтинг"
      onchange={(e) => {
        e.preventDefault();
        minRating = Number(e.currentTarget.value) || 0;
      }}
    />
    <input
      value={maxDistance}
      class="input m-2"
      type="text"
      placeholder="Максимальный срок"
      onchange={(e) => {
        e.preventDefault();
        maxDistance = Number(e.currentTarget.value);
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
