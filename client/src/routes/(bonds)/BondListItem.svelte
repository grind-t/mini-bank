<script lang="ts">
  import { getBondRatingText } from "$lib/bonds/rating";
  import type { Bond, DCAStrategyAsset } from "$lib/common/api";
  import { getDistanceInYearsText } from "$lib/common/date";

  let {
    bond,
    strategyAsset,
    onAddToStrategy,
    onRemoveFromStrategy,
  }: {
    bond: Bond;
    strategyAsset: DCAStrategyAsset | undefined;
    onAddToStrategy: (asset: DCAStrategyAsset) => void;
    onRemoveFromStrategy: (asset: DCAStrategyAsset) => void;
  } = $props();
</script>

<li class="list-row">
  <label>
    <input
      checked={!!strategyAsset}
      type="checkbox"
      class="checkbox checkbox-xs"
      onclick={(e) => {
        e.preventDefault();

        if (!strategyAsset) {
          onAddToStrategy({ id: bond.isin, weight: 1 });
        } else {
          onRemoveFromStrategy(strategyAsset);
        }
      }}
    />
  </label>
  <div class="list-col-grow flex">
    <button
      class="flex-3 flex items-center gap-1"
      onclick={() => navigator.clipboard.writeText(bond.isin)}
    >
      {bond.name}
    </button>
    <div class="flex-2">{getBondRatingText(bond.rating)}</div>
    <div class="flex-2">{bond.yield}%</div>
    <div class="flex-2">
      {getDistanceInYearsText(new Date(bond.maturityDate))}
    </div>
  </div>
</li>
