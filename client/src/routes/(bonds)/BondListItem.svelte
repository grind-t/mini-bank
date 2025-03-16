<script lang="ts">
  import { getBondRatingText } from "$lib/bonds/rating";
  import type { Bond, DCAStrategyAsset } from "$lib/common/api";
  import { getDistanceInYearsText } from "$lib/common/date";

  let {
    bond,
    isHidden,
    strategyAsset,
    onAddToStrategy,
    onRemoveFromStrategy,
    onHide,
    onShow,
  }: {
    bond: Bond;
    isHidden?: boolean;
    strategyAsset?: DCAStrategyAsset;
    onAddToStrategy?: (asset: DCAStrategyAsset) => void;
    onRemoveFromStrategy?: (asset: DCAStrategyAsset) => void;
    onHide?: () => void;
    onShow?: () => void;
  } = $props();
</script>

<li class="list-row">
  <div class="flex flex-col gap-2">
    <label>
      <input
        disabled={isHidden}
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
    {#if !strategyAsset}
      <label class={["swap", isHidden && "swap-active"]}>
        <input
          type="checkbox"
          checked={isHidden}
          onclick={(e) => {
            e.preventDefault();

            if (isHidden) {
              onShow?.();
            } else {
              onHide?.();
            }
          }}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="swap-on size-4 fill-current"
        >
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path
            fill-rule="evenodd"
            d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            clip-rule="evenodd"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="swap-off size-4 fill-current"
        >
          <path
            fill-rule="evenodd"
            d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
            clip-rule="evenodd"
          />
          <path
            d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z"
          />
        </svg>
      </label>
    {/if}
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
    <div class="flex-2">{getBondRatingText(bond.rating)}</div>
    <div class="flex-2">{bond.yield}%</div>
    <div class="flex-2">
      {getDistanceInYearsText(new Date(bond.maturityDate))}
    </div>
  </div>
</li>
