<script lang="ts">
  import type { BondListFilter } from "$lib/trpc";
  import BooleanFilterFieldset from "$lib/ui/filters/BooleanFilterFieldset.svelte";
  import NumberFilterFieldset from "$lib/ui/filters/NumberFilterFieldset.svelte";
  import { bondFinderRatings } from "../rating/getBondFinderRatingText";
  import { tInvestBondRatings } from "../rating/getTInvestBondRatingText";

  const bondFinderRatingItems = Object.entries(bondFinderRatings)
    .map(([value, label]) => ({ label, value: Number(value) }))
    .sort((a, b) => b.value - a.value);

  const tInvestBondRatingItems = Object.entries(tInvestBondRatings)
    .map(([value, label]) => ({ label, value: Number(value) }))
    .sort((a, b) => b.value - a.value);

  let {
    filter,
    onSubmit,
  }: {
    filter: BondListFilter;
    onSubmit: (filter: BondListFilter) => void;
  } = $props();

  let tInvest = $state(filter.rating?.tInvest || {});
  let bondFinder = $state(filter.rating?.bondFinder || {});
  let forQual = $state(filter.forQual || {});
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    onSubmit({
      ...filter,
      rating: {
        tInvest,
        bondFinder,
      },
      forQual,
    });
  }}
>
  <h2 class="mb-2">Фильтр рисков</h2>
  <div class="flex flex-col gap-2">
    <NumberFilterFieldset
      legend="Рейтинг рейтингового агенства"
      bind:value={bondFinder}
      gteItems={bondFinderRatingItems}
      lteItems={bondFinderRatingItems}
    />
    <NumberFilterFieldset
      legend="Рейтинг Т-Инвестиций"
      bind:value={tInvest}
      gteItems={tInvestBondRatingItems}
      lteItems={tInvestBondRatingItems}
    />
    <BooleanFilterFieldset
      legend="Для квалифицированных инвесторов"
      bind:value={forQual}
    />
  </div>
  <button class="btn btn-primary mt-4">Применить</button>
</form>
