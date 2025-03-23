<script lang="ts">
  import {
    getTInvestBondRatingText,
    getBondFinderRatingText,
  } from "$lib/bonds/rating";
  import type { Bond, DCAStrategyAsset } from "$lib/common/api";
  import { getDistanceInYearsText } from "$lib/common/date";

  let {
    bond,
    strategyAsset,
    onAddToStrategy,
    onRemoveFromStrategy,
  }: {
    bond: Bond;
    strategyAsset?: DCAStrategyAsset;
    onAddToStrategy?: (asset: DCAStrategyAsset) => void;
    onRemoveFromStrategy?: (asset: DCAStrategyAsset) => void;
  } = $props();
</script>

<li class="list-row">
  <div class="flex flex-col gap-2">
    <label>
      <input
        checked={!!strategyAsset}
        type="checkbox"
        class="checkbox checkbox-xs"
        onclick={(e) => {
          e.preventDefault();

          if (!strategyAsset) {
            onAddToStrategy?.({ id: bond.isin, weight: 1 });
          } else {
            onRemoveFromStrategy?.(strategyAsset);
          }
        }}
      />
    </label>
  </div>
  <div class="list-col-grow flex">
    <div class="flex-3 flex flex-col gap-2">
      <div>{bond.name}</div>
      <button
        class="h-fit"
        aria-label="Скопировать isin"
        onclick={() => navigator.clipboard.writeText(bond.isin)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="size-4"
        >
          <path
            d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z"
          />
          <path
            d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z"
          />
        </svg>
      </button>
    </div>
    <div class="flex-2 flex flex-col gap-2">
      {#if bond.rating.bondFinder}
        <div>{getBondFinderRatingText(bond.rating.bondFinder)}</div>
      {/if}
      {#if bond.rating.tInvest !== undefined}
        <div>{getTInvestBondRatingText(bond.rating.tInvest)}</div>
      {/if}
    </div>
    <div class="flex-2">{bond.yield}%</div>
    <div class="flex-2">
      {#if bond.maturityDate}
        {getDistanceInYearsText(new Date(bond.maturityDate))}
      {:else}
        N/A
      {/if}
    </div>
  </div>
</li>
