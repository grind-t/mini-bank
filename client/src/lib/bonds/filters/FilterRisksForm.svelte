<script lang="ts">
  import type { BondListFilter } from "$lib/trpc";
  import BooleanFilterFieldset from "$lib/ui/filters/BooleanFilterFieldset.svelte";
  import NumberFilterFieldset from "$lib/ui/filters/NumberFilterFieldset.svelte";
  import { ratingScale } from "@grind-t/cbr-ratings";
  import { tInvestBondRatings } from "../rating/getTInvestBondRatingText";

  const tInvestBondRatingItems = Object.entries(tInvestBondRatings)
    .map(([value, label]) => ({ label, value: Number(value) }))
    .sort((a, b) => b.value - a.value);

  const KRARatingItems = ratingScale
    .map((label, value) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  let {
    filter,
    onSubmit,
  }: {
    filter: BondListFilter;
    onSubmit: (filter: BondListFilter) => void;
  } = $props();

  let tInvest = $state(filter.rating?.tInvest || {});
  let AKRA = $state(filter.rating?.AKRA || {});
  let NKR = $state(filter.rating?.NKR || {});
  let EXPERT_RA = $state(filter.rating?.EXPERT_RA || {});
  let NRA = $state(filter.rating?.NRA || {});
  let forQual = $state(filter.forQual || {});
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    onSubmit({
      ...filter,
      rating: {
        tInvest,
        AKRA,
        NKR,
        EXPERT_RA,
        NRA,
      },
      forQual,
    });
  }}
>
  <h2 class="mb-2">Фильтр рисков</h2>
  <div class="flex flex-col gap-2">
    <NumberFilterFieldset
      legend="Рейтинг Т-Инвестиций"
      bind:value={tInvest}
      gteItems={tInvestBondRatingItems}
      lteItems={tInvestBondRatingItems}
    />
    <NumberFilterFieldset
      legend="Рейтинг АКРА"
      bind:value={AKRA}
      gteItems={KRARatingItems}
      lteItems={KRARatingItems}
    />
    <NumberFilterFieldset
      legend="Рейтинг НКР"
      bind:value={NKR}
      gteItems={KRARatingItems}
      lteItems={KRARatingItems}
    />
    <NumberFilterFieldset
      legend="Рейтинг Эксперт РА"
      bind:value={EXPERT_RA}
      gteItems={KRARatingItems}
      lteItems={KRARatingItems}
    />
    <NumberFilterFieldset
      legend="Рейтинг НРА"
      bind:value={NRA}
      gteItems={KRARatingItems}
      lteItems={KRARatingItems}
    />
    <BooleanFilterFieldset
      legend="Для квалифицированных инвесторов"
      bind:value={forQual}
    />
  </div>
  <button class="btn btn-primary mt-4">Применить</button>
</form>
